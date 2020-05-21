import React, { ComponentType, useState, useCallback } from 'react';
import { Flex } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
export interface SidebarProps {
  // SidebarBox: JSX.Element;
  SidebarBox: ComponentType<{ isSidebarOpen: boolean }>;
  HeaderBox: ComponentType<{ toggleSideBar(): unknown }>;
}

export const WithSidebar: React.FC<SidebarProps> = ({
  SidebarBox,
  HeaderBox,
  children
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSideBar = useCallback(() => setSidebarOpen(!isSidebarOpen), [
    isSidebarOpen
  ]);
  return (
    <Wrapper>
      <HeaderBox toggleSideBar={toggleSideBar} />
      <CenteredWrapper>
        {/* {SidebarBox} */}
        <SidebarBox isSidebarOpen={isSidebarOpen} />
        <Flex ml={2}>{children}</Flex>
      </CenteredWrapper>
    </Wrapper>
  );
};
const Wrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

const CenteredWrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: 66px;
`;
