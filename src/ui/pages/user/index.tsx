import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex, Text, Box } from 'rebass/styled-components';
import { Header } from 'ui/modules/Header';
import { FormikHook } from 'ui/@types/types';
import { LoadMore } from 'ui/modules/Loadmore';
import {
  Wrapper,
  WrapperCont,
  List,
  ObjectsList,
  MainContainer,
  HomeBox,
  MenuList
} from 'ui/elements/Layout';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from 'ui/elements/Panel';
import { Link } from 'react-feather';

export interface Props {
  ActivityBoxes: JSX.Element;
  LikesBoxes: JSX.Element; // FIX ME remove ? after add LikesBoxes at HOC
  HeroUserBox: JSX.Element;
  CommunityBoxes: JSX.Element;
  CollectionsBoxes: JSX.Element;
  UserBoxes: JSX.Element;
  basePath: string;
  totalCommunities: string;
  totalActivities: string;
  totalCollections: string;
  totalUsers: string;
  userLink: string;
  userName: string;
  loadMoreFormik?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
  loadMoreActivities?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
  loadMoreLikes?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
  loadMoreCommunities?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
  loadMoreCollections?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
  loadMoreFollowing?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
}

export const User: React.FC<Props> = ({
  HeroUserBox,
  LikesBoxes,
  ActivityBoxes,
  CommunityBoxes,
  CollectionsBoxes,
  UserBoxes,
  basePath,
  totalCommunities,
  userLink,
  totalCollections,
  totalUsers,
  userName,
  loadMoreActivities,
  loadMoreLikes,
  loadMoreCommunities,
  loadMoreCollections,
  loadMoreFollowing
}) => {
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Box mb={2}>
              <Header name={userName} />
              {HeroUserBox}
              <Menu
                basePath={basePath}
                totalCommunities={totalCommunities}
                totalCollections={totalCollections}
                totalUsers={totalUsers}
              />
            </Box>
            <Switch>
              <Route exact path={`${basePath}/`}>
                <List>{ActivityBoxes}</List>
                {loadMoreActivities && (
                  <LoadMore LoadMoreFormik={loadMoreActivities} />
                )}
              </Route>
              <Route exact path={`${basePath}/likes`}>
                <List>{LikesBoxes}</List>
                {loadMoreLikes && <LoadMore LoadMoreFormik={loadMoreLikes} />}
              </Route>
              <Route path={`${basePath}/communities`}>
                <ObjectsList>{CommunityBoxes}</ObjectsList>
                {loadMoreCommunities && (
                  <LoadMore LoadMoreFormik={loadMoreCommunities} />
                )}
              </Route>
              <Route path={`${basePath}/collections`}>
                <ObjectsList>{CollectionsBoxes}</ObjectsList>
                {loadMoreCollections && (
                  <LoadMore LoadMoreFormik={loadMoreCollections} />
                )}
              </Route>
              {/* <Route path={`${basePath}/following`}>
                {UserBoxes}
                {loadMoreFollowing ? (
                  <LoadMore LoadMoreFormik={loadMoreFollowing} />
                ) : null}{' '} */}
              {/* FIX ME after add LoadMoreFormik */}
              {/* </Route> */}
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        {userLink.length > 0 ? (
          <Panel>
            <PanelTitle fontSize={0} fontWeight={'bold'}>
              Relevant links
            </PanelTitle>
            <Nav>
              <NavItem fontSize={1}>
                <Flex>
                  <Link size={20} />{' '}
                  <Text ml={2} flex={1}>
                    {userLink}
                  </Text>
                </Flex>
              </NavItem>
            </Nav>
          </Panel>
        ) : null}
      </WrapperPanel>
    </MainContainer>
  );
};

const Menu = ({
  basePath,
  totalCommunities,
  totalCollections,
  totalUsers
}: {
  basePath: string;
  totalCommunities: string;
  totalCollections: string;
  totalUsers: string;
}) => (
  <MenuList p={3} pt={3}>
    <NavLink exact to={`${basePath}`}>
      Recent activity
    </NavLink>
    <NavLink exact to={`${basePath}/likes`}>
      Likes
    </NavLink>
    <NavLink exact to={`${basePath}/communities`}>
      {totalCommunities} communities
    </NavLink>
    <NavLink exact to={`${basePath}/collections`}>
      {totalCollections} collections
    </NavLink>
    {/* <NavLink exact to={`${basePath}/following`}>
      {totalUsers} following
    </NavLink> */}
  </MenuList>
);
