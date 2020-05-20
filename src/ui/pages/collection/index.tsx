import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass/styled-components';
import { Trans } from '@lingui/react';
import styled from 'ui/themes/styled';
import { FormikHook } from 'ui/@types/types';
import Modal from 'ui/modules/Modal';
import Button from 'ui/elements/Button';
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
  ActivitiesBox: JSX.Element;
  ResourcesBox: JSX.Element;
  HeroCollectionBox: JSX.Element;
  FollowersBoxes: JSX.Element;
  ShareLinkModalPanel: React.ComponentType<{ done(): any }>;
  EditCollectionPanel: React.ComponentType<{ done(): any }>;
  UploadResourcePanel: React.ComponentType<{ done(): any }>;
  basePath: string;
  collectionName: string;
  loadMoreActivities?: FormikHook;
  loadMoreResources?: FormikHook;
  loadMoreFollowers?: FormikHook;
  isCommunityMember?: boolean; // FIX ME remove ? after added at HOC
}

export const Collection: React.FC<Props> = ({
  HeroCollectionBox,
  ShareLinkModalPanel,
  EditCollectionPanel,
  UploadResourcePanel,
  ActivitiesBox,
  FollowersBoxes,
  ResourcesBox,
  basePath,
  collectionName,
  loadMoreActivities,
  loadMoreResources,
  loadMoreFollowers,
  isCommunityMember
}) => {
  const [isOpenEditCollection, setOpenEditCollection] = React.useState(false);
  const [isShareLinkOpen, setOpenShareLink] = React.useState(false);
  const [isUploadOpen, setUploadOpen] = React.useState(false);
  isCommunityMember = true; // FIX ME remove after added at HOC
  return (
    <MainContainer>
      {isOpenEditCollection && (
        <Modal closeModal={() => setOpenShareLink(false)}>
          <EditCollectionPanel done={() => setOpenEditCollection(false)} />
        </Modal>
      )}
      {isShareLinkOpen && (
        <Modal closeModal={() => setOpenShareLink(false)}>
          <ShareLinkModalPanel done={() => setOpenShareLink(false)} />
        </Modal>
      )}
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Header name={collectionName} />
            <Switch>
              <Route path={`${basePath}/followers`}>
                <FollowersMenu basePath={`${basePath}/followers`} />
                <ObjectsList>{FollowersBoxes}</ObjectsList>
                {loadMoreFollowers && (
                  <LoadMore LoadMoreFormik={loadMoreFollowers} />
                )}
              </Route>
              <Route exact path={`${basePath}/resources`}>
                <>
                  {HeroCollectionBox}
                  <Menu basePath={basePath} />
                  {isCommunityMember ? (
                    <WrapButton p={3}>
                      <Button
                        mr={2}
                        onClick={() => setOpenShareLink(true)}
                        variant="outline"
                      >
                        <Trans>Share link</Trans>
                      </Button>
                      <Button
                        onClick={() => setUploadOpen(true)}
                        variant="outline"
                      >
                        <Trans>Add new resource</Trans>
                      </Button>
                    </WrapButton>
                  ) : null}

                  {isUploadOpen && (
                    <UploadResourcePanel done={() => setUploadOpen(false)} />
                  )}
                  <ObjectsList>{ResourcesBox}</ObjectsList>
                  {loadMoreResources && (
                    <LoadMore LoadMoreFormik={loadMoreResources} />
                  )}
                </>
              </Route>
              <Route exact path={`${basePath}/`}>
                <>
                  {HeroCollectionBox}
                  <Menu basePath={basePath} />
                  <List>{ActivitiesBox}</List>
                  {loadMoreActivities && (
                    <LoadMore LoadMoreFormik={loadMoreActivities} />
                  )}
                </>
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <SidePanel />
    </MainContainer>
  );
};
export default Collection;

const FollowersMenu = ({ basePath }: { basePath: string }) => (
  <MenuList m={2} p={2} pt={0}>
    <NavLink exact to={`${basePath}`}>
      Followers
    </NavLink>
  </MenuList>
);

const Menu = ({ basePath }: { basePath: string }) => (
  <MenuList p={3} pt={3}>
    <NavLink exact to={`${basePath}`}>
      Recent activity
    </NavLink>
    <NavLink exact to={`${basePath}/resources`}>
      <Trans>Resources</Trans>
    </NavLink>
  </MenuList>
);

const WrapButton = styled(Flex)`
  background: ${props => props.theme.colors.appInverse};
  button {
    width: 100%;
    height: 50px;
  }
`;
