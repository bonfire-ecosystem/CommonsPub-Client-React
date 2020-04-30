import { useMyFollowedCommunities } from 'fe/community/myFollowed/myFollowedCommunities';
import React, { FC, useMemo } from 'react';
import {
  CommunityPreview,
  Props as PropsUI,
  Sidebar as SidebarUI,
  Status as StatusUI
} from 'ui/modules/Sidebar/index';
import { MyFollowedCommunityDataFragment } from 'fe/community/myFollowed/myFollowedCommunities.generated';

export interface Sidebar {
  //FIXME: delete commented out stuff
  // user: SidebarMeUserFragment;
}
export const Sidebar: FC<Sidebar> = (/* { user } */) => {
  const { myCommunityFollowsPage } = useMyFollowedCommunities();
  const communities = useMemo(
    () =>
      myCommunityFollowsPage.edges
        .map(follow => follow.context)
        .filter(
          (context): context is MyFollowedCommunityDataFragment =>
            context.__typename === 'Community'
        )
        .map<CommunityPreview>(community => {
          return {
            icon: community.icon?.url || '',
            link: {
              url: `/communities/${community.id}`,
              external: !community.isLocal
            },
            name: community.name
          };
        }),
    [myCommunityFollowsPage]
  );

  const propsUI = useMemo<PropsUI>(() => {
    const props: PropsUI = {
      status: StatusUI.Loaded,
      communities
    };
    return props;
  }, [communities]);
  return <SidebarUI {...propsUI} />;
};
