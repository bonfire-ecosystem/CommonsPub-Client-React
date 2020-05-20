import { useMe } from 'fe/session/useMe';
import { MainHeaderHOC } from 'HOC/modules/previews/Header/Header';
import { Sidebar } from 'HOC/modules/Sidebar/Sidebar';
import React, { FC, useMemo } from 'react';
import { SidebarProps, WithSidebar } from 'ui/templates/withSidebar';
import { GuestTemplate } from '../Guest/Guest';

export interface WithSidebarTemplate {}
export const WithSidebarTemplate: FC<WithSidebarTemplate> = ({ children }) => {
  const meQ = useMe();
  const withSidebarProps = useMemo<null | SidebarProps>(() => {
    const user = meQ.me?.user;
    if (!user) {
      return null;
    }
    // const sidebarHocProps: Sidebar = {
    //   user
    // };
    const props: SidebarProps = {
      // SidebarBox: <Sidebar {...sidebarHocProps} />,
      SidebarBox: Sidebar,
      HeaderBox: MainHeaderHOC
    };
    return props;
  }, [meQ]);
  return withSidebarProps ? (
    <WithSidebar {...withSidebarProps}>{children}</WithSidebar>
  ) : (
    <GuestTemplate>{children}</GuestTemplate>
  );
};
