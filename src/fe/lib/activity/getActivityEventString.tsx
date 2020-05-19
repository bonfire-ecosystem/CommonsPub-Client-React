import { ActivityPreviewFragment } from 'HOC/modules/previews/activity/ActivityPreview.generated';
import { ActivityVerb } from 'graphql/types.generated';
import { getActivityMainContext } from './getActivityMainContext';
import Maybe from 'graphql/tsutils/Maybe';

export const getEventString = (activity: Maybe<ActivityPreviewFragment>) => {
  if (!activity?.context) {
    return '';
  }
  const mainContext = getActivityMainContext(activity.context);
  if (!mainContext) {
    return '';
  }
  const { __typename } = mainContext;
  const event =
    activity.context.__typename === 'Flag'
      ? `Flagged ${__typename}`
      : activity.context.__typename === 'Like'
      ? `Liked ${__typename}`
      : activity.context.__typename === 'Follow'
      ? `Followed ${__typename}`
      : activity.context.__typename === 'Comment'
      ? activity.context.inReplyTo
        ? `Replied to a thread`
        : `Started a thread`
      : activity.verb === ActivityVerb.Created
      ? `Created ${__typename}`
      : `Updated ${__typename}`; //activity.verb === ActivityVerb.Updated

  return event;
};
