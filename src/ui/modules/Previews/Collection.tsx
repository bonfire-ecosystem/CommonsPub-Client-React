import { Trans } from '@lingui/react';
import * as React from 'react';
import { Eye, EyeOff, Archive } from 'react-feather';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { FormikHook } from 'ui/@types/types';
// import Avatar from 'ui/elements/Avatar';
// import { SimpleLink } from 'ui/helpers/SimpleLink';
import styled from 'ui/themes/styled';
import { typography } from 'mn-constants';
import { darken } from 'polished';
import { NavLink } from 'react-router-dom';

export interface Props {
  link: {
    url: string;
    external: boolean;
  };
  icon: string;
  name: string;
  summary: string;
  displayUsername: string;
  totalResources: number | null;
  isFollowing: boolean;
  toggleFollowFormik: FormikHook;
  hideActions?: boolean;
}

export const Collection: React.FC<Props> = ({
  link,
  icon,
  name,
  summary,
  displayUsername,
  totalResources,
  isFollowing,
  toggleFollowFormik,
  hideActions
}) => {
  // const { push } = useHistory();
  return (
    <Bordered mb={1}>
      <WrapperLink to={link.url} />
      <AvatarCollection src={icon} />
      <Infos ml={3}>
        <Flex>
          <Box flex={1}>
            <Title>
              {name.length > 80
                ? name.replace(/^(.{76}[^\s]*).*/, '$1...')
                : name}
            </Title>
            {/* <C>+{displayUsername}</Username> */}
          </Box>
        </Flex>
        <Summary variant="text" mt={1} mb={2}>
          {summary && summary.length > 140
            ? summary.replace(/^([\s\S]{140}[^\s]*)[\s\S]*/, '$1...')
            : summary}
        </Summary>
        <MetaWrapper mt={2} alignItems="center">
          <Archive size={18} />
          <Text ml={2} variant="suptitle">
            {totalResources || 0} <Trans>Resources</Trans>
          </Text>
        </MetaWrapper>

        <Meta mt={2}>
          {hideActions ? null : (
            <ActionItem
              isFollowing={isFollowing ? true : false}
              onClick={toggleFollowFormik.submitForm}
            >
              <ActionIcon>
                {isFollowing ? (
                  <EyeOff strokeWidth="1" size="18" />
                ) : (
                  <Eye strokeWidth="1" size="18" />
                )}
              </ActionIcon>
              <Text
                ml={1}
                variant={'suptitle'}
                sx={{ textTransform: 'capitalize' }}
              >
                {isFollowing ? <Trans>Unfollow </Trans> : <Trans>follow</Trans>}
              </Text>
            </ActionItem>
          )}
        </Meta>
      </Infos>
    </Bordered>
  );
};

const WrapperLink = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const MetaWrapper = styled(Flex)`
  color: ${props => props.theme.colors.dark};
  svg  {
    margin: 0;
  }
`;

const Summary = styled(Text)`
  color: ${props => props.theme.colors.dark};
`;
const AvatarCollection = styled(Box)<{ src?: string }>`
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  min-width: 48px;
  height: 48px;
  padding: 15%;
  background-color: transparent;
  background-image: url("${props => props.src}");
  background-size: cover;
  background-position: center center;
`;

const ActionItem = styled(Flex)<{ isFollowing?: boolean }>`
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;

  color: ${props =>
    props.isFollowing
      ? props.theme.colors.lighter
      : props.theme.colors.mediumdark};
  div {
    color: ${props =>
      props.isFollowing
        ? props.theme.colors.lighter
        : props.theme.colors.mediumdark};
  }
  background: ${props =>
    props.isFollowing
      ? props.theme.colors.secondary
      : props.theme.colors.mediumlight};
  border-radius: 4px;
  padding: 0 8px;
  margin-right: 8px;
  text-align: center;
  font-size: ${typography.size.s1};
  svg {
    stroke: ${props =>
      props.isFollowing
        ? props.theme.colors.lighter
        : props.theme.colors.mediumdark};
  }
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 9;
  }
  &:hover {
    background: ${props =>
      darken(
        '0.1',
        props.isFollowing
          ? props.theme.colors.secondary
          : props.theme.colors.mediumlight
      )};
    svg.hover {
      stroke: ${props => props.theme.colors.mediumdark};
    }
  }
`;

const ActionIcon = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 99999px;
  display: inline-flex;
  align-items: center;
  align-content: center;
  text-align: center;
  margin-left: -8px;
  svg {
    margin: 0 auto;
  }
`;

// const TitleLink = styled(SimpleLink)`
//   text-decoration: none;
//   color: ${props => props.theme.colors.darker};
//   background: red;
//   > a {
//     text-decoration: none;
//   }
// `;

const Meta = styled(Flex)`
  color: ${props => props.theme.colors.medium};
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
`;

// const Username = styled(Text)`
//   color: ${props => props.theme.colors.mediumdark};
//   flex: 1;
//   font-size: 14px;
//   text-transform: lowercase;
// `;

const Bordered = styled(Flex)`
  border-radius: 4px;
  border: ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.appInverse};
  text-decoration: none;
  position: relative;
  &:hover {
    background: ${props => darken('0.05', props.theme.colors.appInverse)};
  }
  * {
    text-decoration: none !important;
    &:hover {
      text-decoration: none !important;
    }
  }
`;

const Infos = styled(Box)`
  flex: 1;
  position: relative;
  div {
    text-decoration: none;
  }
`;
const Title = styled(Heading)`
  color: ${props => props.theme.colors.darker};
  font-size: 20px;
  text-decoration: none;
  word-break: break-all;
  margin-top: 8px;
`;
