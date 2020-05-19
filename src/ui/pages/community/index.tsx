import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex, Box } from 'rebass/styled-components';
import SocialText from 'ui/modules/SocialText';
import { Trans } from '@lingui/react';
import Button from 'ui/elements/Button';

import styled from 'ui/themes/styled';
import { FormikHook } from 'ui/@types/types';
import Modal from 'ui/modules/Modal';
import { Header } from 'ui/modules/Header';
import { LoadMore } from 'ui/modules/Loadmore';
import {
  Wrapper,
  WrapperCont,
  List,
  MainContainer,
  HomeBox,
  MenuList,
  ObjectsList
} from 'ui/elements/Layout';
import { SidePanel } from 'ui/modules/SidePanel';

export interface Props {
  isJoined: boolean;
  ActivitiesBox: JSX.Element;
  FollowersBoxes: JSX.Element;
  CollectionsBox: JSX.Element;
  HeroCommunityBox: JSX.Element;
  ThreadsBox: JSX.Element;
  communityName: string;
  basePath: string;
  newThreadFormik: null | FormikHook<{ text: string }>;
  CreateCollectionPanel: React.ComponentType<{ done(): any }>;
  loadMoreActivities: FormikHook | undefined;
  loadMoreCollections: FormikHook | undefined;
  loadMoreThreads: FormikHook | undefined;
}

export const Community: React.FC<Props> = ({
  ActivitiesBox,
  HeroCommunityBox,
  CollectionsBox,
  FollowersBoxes,
  basePath,
  newThreadFormik,
  isJoined,
  communityName,
  ThreadsBox,
  CreateCollectionPanel,
  loadMoreActivities,
  loadMoreCollections,
  loadMoreThreads
}) => {
  const [isOpenCreateCollection, setOpenCreateCollection] = React.useState(
    false
  );

  return (
    <MainContainer>
      {isOpenCreateCollection && (
        <Modal closeModal={() => setOpenCreateCollection(false)}>
          <CreateCollectionPanel done={() => setOpenCreateCollection(false)} />
        </Modal>
      )}
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Header name={communityName} />
            <Switch>
              <Route exact path={`${basePath}`}>
                <>
                  {HeroCommunityBox}
                  <Menu basePath={basePath} />
                  <List mt={2}>{ActivitiesBox}</List>
                  {loadMoreActivities && (
                    <LoadMore LoadMoreFormik={loadMoreActivities} />
                  )}
                </>
              </Route>
              <Route path={`${basePath}/collections`}>
                <>
                  {HeroCommunityBox}
                  <Menu basePath={basePath} />
                  {isJoined && (
                    <WrapButton p={2} mb={2}>
                      <Button
                        variant="outline"
                        onClick={() => setOpenCreateCollection(true)}
                      >
                        <Trans>Create a new collection</Trans>
                      </Button>
                    </WrapButton>
                  )}
                  <ObjectsList>{CollectionsBox}</ObjectsList>
                  {loadMoreCollections && (
                    <LoadMore LoadMoreFormik={loadMoreCollections} />
                  )}
                </>
              </Route>
              <Route path={`${basePath}/discussions`}>
                <>
                  {HeroCommunityBox}
                  <Menu basePath={basePath} />
                  <WrapSocialText p={3} mb={2}>
                    {newThreadFormik && (
                      <SocialText
                        placeholder="Start a new thread..."
                        submit={text => {
                          newThreadFormik.setValues({ text });
                          newThreadFormik.submitForm();
                        }}
                      />
                    )}
                  </WrapSocialText>
                  <ObjectsList>{ThreadsBox}</ObjectsList>
                  {loadMoreThreads && (
                    <LoadMore LoadMoreFormik={loadMoreThreads} />
                  )}
                </>
              </Route>
              <Route path={`${basePath}/members`}>
                <Container>
                  <FollowersMenu basePath={`${basePath}/members`} />
                  <ObjectsList>{FollowersBoxes}</ObjectsList>
                </Container>
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <SidePanel />
    </MainContainer>
  );
};

const FollowersMenu = ({ basePath }: { basePath: string }) => (
  <MenuList m={2}>
    <NavLink exact to={`${basePath}`}>
      Members
    </NavLink>
  </MenuList>
);

const Menu = ({ basePath }: { basePath: string }) => (
  <MenuList p={3} pt={0}>
    <NavLink exact to={`${basePath}`}>
      Recent activity
    </NavLink>
    <NavLink to={`${basePath}/collections`}>Collections</NavLink>
    <NavLink to={`${basePath}/discussions`}>Discussions</NavLink>
  </MenuList>
);

const Container = styled(Box)`
  background: ${props => props.theme.colors.appInverse};
`;

const WrapButton = styled(Flex)`
  background: ${props => props.theme.colors.appInverse};
  button {
    width: 100%;
    height: 50px;
  }
`;

const WrapSocialText = styled(Box)`
  background: ${props => props.theme.colors.appInverse};
`;

export default Community;
