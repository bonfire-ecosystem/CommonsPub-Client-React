import { SettingsPage, SettingsPageTab } from 'HOC/pages/settings/SettingsPage';
import { NotFound } from 'ui/pages/notFound';
import React, { FC, useMemo } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { WithoutSidebarTemplate } from 'HOC/templates/WithoutSidebar/WithoutSidebar';
import { RedirectAnonymousToLogin } from './wrappers/RedirectBySession';

interface SettingsPageRouter {
  tab?: string;
}
const SettingsPageRouter: FC<RouteComponentProps<SettingsPageRouter>> = ({
  match
}) => {
  const maybeTabStr = match.params.tab;
  const tab =
    maybeTabStr === 'preferences'
      ? SettingsPageTab.Preferences
      : maybeTabStr === 'logs'
      ? SettingsPageTab.ModerationLogs
      : maybeTabStr === 'invites'
      ? SettingsPageTab.Invites
      : maybeTabStr === 'instance'
      ? SettingsPageTab.Instance
      : maybeTabStr === 'flags'
      ? SettingsPageTab.Flags
      : !maybeTabStr
      ? SettingsPageTab.General
      : null;

  const props = useMemo<SettingsPage | null>(
    () =>
      tab === null
        ? null
        : {
            tab,
            basePath: `/settings`
          },
    [tab]
  );

  if (!props) {
    return <NotFound />;
  }

  return (
    <RedirectAnonymousToLogin>
      <WithoutSidebarTemplate>
        <SettingsPage {...props} />
      </WithoutSidebarTemplate>
    </RedirectAnonymousToLogin>
  );
};

export const SettingsPageRoute: RouteProps = {
  exact: true,
  path: '/settings/:tab?',
  component: SettingsPageRouter
};
