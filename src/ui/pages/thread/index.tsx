import * as React from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import styled from 'ui/themes/styled';
import { Link } from 'react-router-dom';
import Avatar from 'ui/elements/Avatar';
import { WrapperPanel } from 'ui/elements/Panel';
import { FormikHook } from 'ui/@types/types';
import { LoadMore } from 'ui/modules/Loadmore';
import {
  Wrapper,
  WrapperCont,
  ObjectsList,
  MainContainer,
  HomeBox
} from 'ui/elements/Layout';

export interface Props {
  MainThread: JSX.Element;
  Comments: JSX.Element;
  Context: JSX.Element;
  communityId: string;
  communityName: string;
  communityIcon: string;
  isCommunityContext: boolean;
  loadMoreComments?: FormikHook; // FIX ME remove ? after add LoadMoreFormik
}

export const Thread: React.FC<Props> = ({
  MainThread,
  Comments,
  communityId,
  communityName,
  communityIcon,
  Context,
  isCommunityContext,
  loadMoreComments
}) => {
  // console.log(Context);
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Box mb={2}>
              {!isCommunityContext && <Box p={2}>{Context}</Box>}
              <MainThreadContainer>{MainThread}</MainThreadContainer>
            </Box>
            <ObjectsList className="replies">{Comments}</ObjectsList>
            {loadMoreComments && <LoadMore LoadMoreFormik={loadMoreComments} />}
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <HeaderWrapper
          id={communityId}
          name={communityName}
          icon={communityIcon}
        />
      </WrapperPanel>
    </MainContainer>
  );
};

const HeaderWrapper: React.FC<{ id: string; name: string; icon: string }> = ({
  id,
  name,
  icon
}) => {
  return (
    <>
      <Header>
        <Right>
          <Link to={`/communities/${id}`}>
            <LinkImg>
              <Avatar size="s" src={icon} />
            </LinkImg>
            <Text variant="suptitle">{name}</Text>
          </Link>
        </Right>
      </Header>
    </>
  );
};

const MainThreadContainer = styled(Box)`
  //  border-bottom: ${props => props.theme.colors.border};
`;

const LinkImg = styled(Box)`
  margin-right: 8px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;
const Right = styled(Flex)`
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
`;

const Header = styled(Flex)`
  border-bottom: ${props => props.theme.colors.border};
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  background: ${props => props.theme.colors.appInverse};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  a {
    display: flex;
    flex: 1;
    text-decoration: none;
  }
`;
