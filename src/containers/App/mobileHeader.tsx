import * as React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import styled from '../../themes/styled';
import { Menu } from 'react-feather';
import { SearchBox } from 'HOC/modules/SearchBox/SearchBox';
import media from 'styled-media-query';

// import media from 'styled-media-query';

const HeaderWrapper = styled(Flex)`
  ${media.lessThan('1005px')`
max-width: 100%;
`};
  height: 60px;
  max-width: 600px;
  background: white;
  align-items: center;
  border-bottom: ${props => props.theme.colors.border};
  border-right: ${props => props.theme.colors.border};
  top: 0px;
  z-index: 99999999999999999999999999999999999999;
  left: 0;
  right: 0;
  ${media.greaterThan('1280px')`
  display: none;
  `};
`;

const MenuBox = styled(Box)`
cursor: pointer;
color: ${props => props.theme.colors.medium}
&:hover {
    color: ${props => props.theme.colors.mediumdark}
}
${media.greaterThan('860px')`
display: none;
`};
`;

const Header = ({ onOpen }) => (
  <HeaderWrapper p={2}>
    <MenuBox mr={2}>
      <Menu onClick={() => onOpen()} size="20" />
    </MenuBox>
    <Box flex="1">
      <SearchBox />
    </Box>
  </HeaderWrapper>
);

export default Header;
