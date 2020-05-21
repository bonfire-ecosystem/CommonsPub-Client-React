import { useCommunityPreview } from 'fe/community/preview/useCommunityPreview';
import { Community } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import {
  Community as CommunityPreviewUI,
  Props as CommunityPreviewProps
} from 'ui/modules/Previews/Community';
import { useFormik } from 'formik';

export interface Props {
  communityId: Community['id'];
  flagged?: boolean;
}

export const CommunityPreviewHOC: FC<Props> = ({ communityId, flagged }) => {
  const { community, toggleJoin } = useCommunityPreview(communityId);

  const toggleJoinFormik = useFormik({
    initialValues: {},
    onSubmit: toggleJoin
  });
  const communityPreviewProps = useMemo<CommunityPreviewProps | null>(() => {
    if (!community) {
      return null;
    }
    const hideActions = flagged ? true : false;
    const {
      icon,
      isLocal,
      name,
      summary,
      myFollow,
      collectionCount,
      followerCount,
      threads,
      canonicalUrl,
      displayUsername
    } = community;

    const props: CommunityPreviewProps = {
      icon: icon?.url || '',
      name,
      summary: summary || '',
      collectionsCount: collectionCount || 0,
      joined: !!myFollow,
      followersCount: followerCount || 0,
      threadsCount: threads?.totalCount || 0,
      toggleJoinFormik,
      link: {
        url: isLocal ? `/communities/${communityId}` : canonicalUrl || '',
        external: !isLocal
      },
      displayUsername,
      hideActions: hideActions
    };
    return props;
  }, [community, toggleJoinFormik]);

  return (
    communityPreviewProps && <CommunityPreviewUI {...communityPreviewProps} />
  );
};
