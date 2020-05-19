import { useActivityPreview } from 'fe/activities/preview/useActivityPreview';
import { getActivityActor } from 'fe/lib/activity/getActivityActor';
import * as GQL from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import * as UI from 'ui/modules/ActivityPreview';
import { PreviewComponent } from './PreviewComponent';

export interface Props {
  activityId: GQL.Activity['id'];
}
export const ActivityPreviewHOC: FC<Props> = ({ activityId }) => {
  const activityBox = useActivityPreview(activityId);
  const props = useMemo<null | UI.Props>(() => {
    const { activity, communityInfoStrings, eventString } = activityBox;
    if (!activity) {
      return { status: UI.Status.Loading };
    } else {
      if (!activity.context) {
        console.error('ActivityPreviewHOC: user or context :null', activity);
        return null;
      }

      const props: UI.Props = {
        status: UI.Status.Loaded,
        createdAt: activity.createdAt,
        actor: activity.user && getActivityActor(activity.user),
        event: eventString,
        ...communityInfoStrings,
        preview: <PreviewComponent context={activity.context} />
      };
      return props;
    }
  }, [activityBox]);

  return props && <UI.ActivityPreview {...props} />;
};
