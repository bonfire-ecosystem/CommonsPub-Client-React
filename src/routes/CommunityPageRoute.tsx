import React, { FC, useMemo } from 'react';
import {
  CommunityPageTab,
  CommunityPage
} from 'HOC/pages/community/CommunityPage';
import { NotFound } from 'ui/pages/notFound';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { WithSidebarTemplate } from 'HOC/templates/WithSidebar/WithSidebar';

interface CommunityPageRouter {
  communityId: string;
  tab?: string;
}
const CommunityPageRouter: FC<RouteComponentProps<CommunityPageRouter>> = ({
  match
}) => {
  const communityId = match.params.communityId;
  const maybeTabStr = match.params.tab;
  const tab =
    maybeTabStr === 'collections'
      ? CommunityPageTab.Collections
      : maybeTabStr === 'members'
      ? CommunityPageTab.Members
      : maybeTabStr === 'discussions'
      ? CommunityPageTab.Discussions
      : !maybeTabStr
      ? CommunityPageTab.Activities
      : null;

  const props = useMemo<CommunityPage | null>(() => {
    return tab === null
      ? null
      : {
          communityId,
          tab,
          basePath: `/communities/${communityId}`
        };
  }, [tab, communityId]);

  if (props === null) {
    return <NotFound />;
  }

  return (
    <WithSidebarTemplate>
      <CommunityPage {...props} />
    </WithSidebarTemplate>
  );
};

export const CommunityPageRoute: RouteProps = {
  exact: true,
  path: '/communities/:communityId/:tab?',
  component: CommunityPageRouter
};
