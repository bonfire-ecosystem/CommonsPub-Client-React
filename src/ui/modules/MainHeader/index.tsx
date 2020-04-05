import React from 'react';
import styled from 'ui/themes/styled';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ChevronLeft, ChevronDown } from 'react-feather';
import { Flex, Text, Box } from 'rebass/styled-components';
import Avatar from 'ui/elements/Avatar';
// import Avatar from 'ui/elements/Avatar';
import { DropdownSidebar } from './dropdown';
import media from 'styled-media-query';
import { ellipsis } from 'polished';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/react';
const MnetLogo = require('static/img/logo-icon.png');
import { prompt_signin } from 'mn-constants';

export interface Props {
  user: null | {
    icon: string;
    name: string;
    link: string;
    logout(): unknown;
  };
  Search: JSX.Element;
}

export const MainHeader: React.FC<Props> = props => {
  const history = useHistory();
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const openMenu = React.useCallback(() => setOpenDropdown(true), []);
  // console.log(history);
  return (
    <HeaderWrapper>
      <FlexWrapper>
        <Left>
          <Icon mx={2} onClick={() => history.goBack()}>
            <ChevronLeft size="20" />
          </Icon>
          <Link to="/">
            <Avatar size="s" src={MnetLogo} />
          </Link>
        </Left>
        <Center>{props.Search}</Center>
        <Header alignItems={'center'}>
          {props.user ? (
            <NavItem
              sx={{ position: 'relative' }}
              alignItems="center"
              onClick={openMenu}
            >
              <Avatar
                size="s"
                initials={props.user.name.substring(0, 2)}
                src={props.user.icon}
                variant="avatar"
              />
              <HeaderName ml={2} variant="link">
                {props.user.name}
              </HeaderName>
              <Right ml={2}>
                <ChevronDown size="20" />
              </Right>
              {isOpenDropdown && (
                <DropdownSidebar
                  logout={props.user.logout}
                  userLink={props.user.link}
                  setOpenDropdown={setOpenDropdown}
                />
              )}
            </NavItem>
          ) : (
            <Flex justifyContent="space-evenly">
              <NavItem>
                <Link to="/">
                  <Text variant="link">
                    <Trans>{prompt_signin}</Trans>
                  </Text>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/discover">
                  <Text variant="link">
                    <Trans>Discover</Trans>
                  </Text>
                </Link>
              </NavItem>
            </Flex>
          )}
        </Header>
      </FlexWrapper>
    </HeaderWrapper>
  );
};

const FlexWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: 50px;
`;
const Center = styled(Box)`
  flex: 1 1 600px;
  order: 1;
  max-width: 600px;
  overflow: hidden;
  input {
    width: 100%;
    margin: 0 auto;
    border: 1px solid ${props => props.theme.colors.lightgray};
    border-radius: 4px;
  }
`;

const Right = styled(Box)`
  color: ${props => props.theme.colors.gray};
`;

const HeaderName = styled(Text)`
  ${ellipsis('180px')};
`;

const NavItem = styled(Flex)`
  border-radius: 0px;
  padding: 4px 8px;
  border-radius: 4px;
  float: right;
  &:hover {
    background: ${props => props.theme.colors.lighter};
  }
  ${media.lessThan('1280px')`
img {
    margin-right: 0;
}
`};
`;

const Header = styled(Box)`
  cursor: pointer;
  flex: 0 0 300px;
  order: 2;
  justify-content: flex-end;
  img {
    min-width: 36px;
    height: 36px;
    border-radius: 36px;
  }
`;

const Icon = styled(Box)`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  &:hover {
    background: ${props => props.theme.colors.lighter};
    svg {
      stroke: ${props => props.theme.colors.primary};
    }
  }
  svg {
    stroke: ${props => props.theme.colors.darkgray};
    margin: 0 auto;
  }
`;

const Left = styled(Flex)`
  align-items: center;
  flex: 0 0 240px;
  order: 0;
  justify-content: flex-start;
`;

const HeaderWrapper = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  height: 50px;
  //   justify-content: space-between;
  cursor: pointer;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999999999999999999;
  padding: 0 8px;
  a {
    display: flex;
    flex: 1;
    text-decoration: none;
  }
`;
