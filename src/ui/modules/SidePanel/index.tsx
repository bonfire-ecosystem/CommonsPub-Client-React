import * as React from 'react';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from 'ui/elements/Panel';
import { Trans } from '@lingui/react';
import { Text } from 'rebass/styled-components';
import styled from 'ui/themes/styled';

export type Props = {};

export const SidePanel: React.FC<Props> = props => {
  return (
    <>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular hashtags
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              #pedagogy
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #transition
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #english
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #template
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #assessment
            </NavItem>
            <NavItem fontSize={1}>
              <ComingSoon variant="text">
                ✨<Trans>This feature is coming soon!</Trans>✨
              </ComingSoon>
            </NavItem>
          </Nav>
        </Panel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular categories
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              Humanities
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Behavioural science
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              English
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Romana
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Postgraduate
            </NavItem>
            <ComingSoon variant="text">
              ✨<Trans>This feature is coming soon!</Trans>✨
            </ComingSoon>
          </Nav>
        </Panel>
      </WrapperPanel>
    </>
  );
};

const ComingSoon = styled(Text)`
  background: aliceblue;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
`;
