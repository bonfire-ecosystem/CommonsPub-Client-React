import styled from '../../themes/styled';
import { Box, Flex, Text } from 'rebass/styled-components';
import media from 'styled-media-query';

export const WrapperPanel = styled(Flex)`
  width: 300px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-left: 8px;
  font-family: ${props => props.theme.fontFamily};
  &.extra {
    width: 100%;
  }
  ${media.lessThan('1095px')`
  width: 290px;
`};
  ${media.lessThan('1005px')`
   display: none;
  `};
`;

export const PanelInner = styled(Flex)`
  position: sticky;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
`;

export const Panel = styled(Box)`
  background: ${props => props.theme.colors.appInverse};
  border-radius: 4px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-bottom: 8px !important;
`;

export const PanelTitle = styled(Text)`
  text-transform: uppercase;
  border-bottom: ${props => props.theme.colors.border};
  padding: 16px;
  color: ${props => props.theme.colors.dark};
`;

export const Nav = styled(Box)`
  padding: 16px;
`;

export const NavItem = styled(Text)`
color: ${props => props.theme.colors.mediumdark}
a {
  color: ${props => props.theme.colors.mediumdark}
  text-decoration: none;
}
  `;
