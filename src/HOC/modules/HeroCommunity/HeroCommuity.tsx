import { useCommunity } from 'fe/community/useCommunity';
import { useMe } from 'fe/session/useMe';
import { useFormik } from 'formik';
import { Community } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import HeroCommunityUI, {
  Props as HeroProps,
  Status
} from 'ui/modules/HeroCommunity';
import { EditCommunityPanelHOC } from 'HOC/modules/EditCommunityPanel/editCommunityPanelHOC';
import { FeatureModalHOC } from 'HOC/modules/FeatureModal/FeatureModal';
import { FlagModalHOC } from 'HOC/modules/FlagModal/flagModalHOC';

export interface HeroCommunity {
  communityId: Community['id'];
  basePath: string;
}

export const HeroCommunity: FC<HeroCommunity> = ({ communityId, basePath }) => {
  const { isAdmin } = useMe();
  const { toggleJoin, community, canModify, isCreator } = useCommunity(
    communityId
  );

  const toggleJoinFormik = useFormik<{}>({
    initialValues: {},
    onSubmit: toggleJoin
  });

  const heroProps = useMemo<HeroProps>(() => {
    if (!community) {
      const props: HeroProps = {
        community: {
          status: Status.Loading
        }
      };
      return props;
    }

    const props: HeroProps = {
      community: {
        basePath,
        status: Status.Loaded,
        canModify,
        isAdmin,
        isCreator,
        following: !!community.myFollow,
        isFlagged: !!community.myFlag,
        icon: community.icon?.url || '',
        name: community.name,
        fullName: community.displayUsername,
        totalMembers: community.followerCount || 0,
        summary: community.summary || '',
        toggleJoinFormik,
        EditCommunityPanel: ({ done }) => (
          <EditCommunityPanelHOC done={done} communityId={community.id} />
        ),
        FlagModal: ({ done }) => <FlagModalHOC done={done} ctx={community} />,
        FeaturedModal: ({ done }: { done(): unknown }) => (
          <FeatureModalHOC done={done} ctx={community} featureId={null} />
        )
      }
    };
    return props;
  }, [isAdmin, community, canModify, toggleJoinFormik, basePath, isCreator]);

  return <HeroCommunityUI {...heroProps} />;
};
