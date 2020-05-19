import { useLMSGQL } from 'fe/lib/moodleLMS/useSendToMoodle';
import { useResourcePreview } from 'fe/resource/preview/useResourcePreview';
import { useFormik } from 'formik';
import { Resource } from 'graphql/types.generated';
import { FlagModalHOC } from 'HOC/modules/FlagModal/flagModalHOC';
import { accepted_license_types } from 'mn-constants';
import React, { FC, useMemo } from 'react';
import {
  Props as ResourcePreviewProps,
  Resource as ResourcePreviewUI
} from 'ui/modules/Previews/Resource';

export interface Props {
  resourceId: Resource['id'];
  flagged?: boolean;
}

export const ResourcePreviewHOC: FC<Props> = ({ resourceId, flagged }) => {
  const { resource, toggleLike } = useResourcePreview(resourceId);

  const toggleLikeFormik = useFormik({
    initialValues: {},
    onSubmit: toggleLike
  });
  const { LMSPrefsPanel } = useLMSGQL(resource);
  const resourcePreviewProps = useMemo<ResourcePreviewProps | null>(() => {
    if (!resource) {
      return null;
    }
    const hideActions = flagged ? true : false;

    const props: ResourcePreviewProps = {
      icon: resource.icon?.url || '',
      link: resource.payload?.url || '',
      name: resource.name || '',
      summary: resource.summary || '',
      like: {
        iLikeIt: !!resource.myLike,
        toggleLikeFormik,
        totalLikes: resource.likers?.totalCount || 0
      },
      isLocal: !!resource.payload?.upload,
      acceptedLicenses: accepted_license_types,
      license: resource.license || null,
      isFlagged: !!resource.myFlag,
      FlagModal: ({ done }) => <FlagModalHOC done={done} ctx={resource} />,
      // sendToMoodle,
      MoodlePanel: LMSPrefsPanel,
      type: resource.payload?.mediaType,
      hideActions: hideActions
    };
    return props;
  }, [resource, toggleLikeFormik, /* sendToMoodle, */ LMSPrefsPanel]);

  return (
    resourcePreviewProps && <ResourcePreviewUI {...resourcePreviewProps} />
  );
};
