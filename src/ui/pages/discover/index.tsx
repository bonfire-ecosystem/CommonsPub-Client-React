import { Trans } from '@lingui/macro';
import * as React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import {
  Wrapper,
  WrapperCont,
  List,
  MainContainer,
  HomeBox,
  ObjectsList,
  MenuList
} from 'ui/elements/Layout';
import { Flex, Box, Text } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
import { FormikHook } from 'ui/@types/types';

import { LoadMore } from 'ui/modules/Loadmore';
import { SidePanel } from 'ui/modules/SidePanel';

export interface Props {
  basePath: string;
  FeaturedCommunitiesBox: JSX.Element;
  FeaturedCollectionsBox: JSX.Element;
  ActivitiesBox: JSX.Element;
  CommunitiesBoxes: JSX.Element;
  CollectionsBoxes: JSX.Element;
  LoadMoreFormik?: FormikHook;
}
export const Discover: React.FC<Props> = ({
  basePath,
  ActivitiesBox,
  FeaturedCommunitiesBox,
  FeaturedCollectionsBox,
  CollectionsBoxes,
  CommunitiesBoxes,
  LoadMoreFormik
}) => {
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <WrapperFeatured>{FeaturedCommunitiesBox}</WrapperFeatured>
          <WrapperFeatured mt={2}>{FeaturedCollectionsBox}</WrapperFeatured>
          <Wrapper>
            <Menu basePath={basePath} />
            <Switch>
              <Route path={`${basePath}/communities`}>
                <ObjectsList>{CommunitiesBoxes}</ObjectsList>
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
              <Route path={`${basePath}/collections`}>
                <ObjectsList>{CollectionsBoxes}</ObjectsList>
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
              <Route path={`${basePath}`}>
                <List>{ActivitiesBox}</List>
                {LoadMoreFormik && <LoadMore LoadMoreFormik={LoadMoreFormik} />}
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <SidePanel />
    </MainContainer>
  );
};

const Menu = ({ basePath }: { basePath: string }) => (
  <>
    <Box p={2} mt={2}>
      <Text variant="suptitle">Browse Home instance</Text>
    </Box>
    <MenuList>
      <NavLink exact to={`${basePath}`}>
        <Trans>Timeline</Trans>
      </NavLink>
      <NavLink exact to={`${basePath}/communities`}>
        <Trans>All communities</Trans>
      </NavLink>
      <NavLink exact to={`${basePath}/collections`}>
        <Trans>All collections</Trans>
      </NavLink>
    </MenuList>
  </>
);

const WrapperFeatured = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${props => props.theme.colors.appInverse};
  border-radius: 8px;
  max-height: 270px;
`;

export default Discover;
