import { Community } from 'graphql/types.generated';
import { useCommunityPreviewQuery } from './useCommunityPreview.generated';
import { useMemo } from 'react';
import { useFollowContext } from 'fe/context/follow/useFollowContext';

export const useCommunityPreview = (communityId: Community['id']) => {
  const communityPreviewQ = useCommunityPreviewQuery({
    variables: { communityId }
  });
  const { toggleFollow } = useFollowContext(communityPreviewQ.data?.community);

  return useMemo(() => {
    return {
      community: communityPreviewQ.data?.community,
      toggleJoin: toggleFollow
    };
  }, [communityPreviewQ, toggleFollow]);
};
