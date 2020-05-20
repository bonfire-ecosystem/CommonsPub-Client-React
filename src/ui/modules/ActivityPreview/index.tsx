import { Trans } from '@lingui/react';
import { DateTime } from 'luxon';
import { clearFix } from 'polished';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass/styled-components';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';
import { Actor } from './types';
import { typography } from 'mn-constants';

export enum Status {
  Loading,
  Loaded
}
export interface ActivityLoaded extends Activity {
  status: Status.Loaded; // FIX ME after fix flags story in settings page
}
export interface ActivityLoading {
  status: Status.Loading; // FIX ME after fix flags story in settings page
}

export interface Activity {
  createdAt: string;
  actor: Actor | null;
  link: string;
  event: string;
  preview: JSX.Element;
  communityLink: string;
  communityName: string;
}

export type Props = ActivityLoaded | ActivityLoading;

export const ActivityPreview: FC<Props> = activity => {
  if (activity.status === Status.Loading) {
    return <Trans>loading...</Trans>;
  }
  // console.log(activity.event);
  return (
    <FeedItem mb={2}>
      {activity.event.toLowerCase().includes('like') ||
      activity.event.toLowerCase().includes('flag')
        ? activity.actor && (
            <SmallActorComp actor={activity.actor} event={activity.event} />
          )
        : activity.actor && (
            <ActorComp
              actor={activity.actor}
              createdAt={activity.createdAt}
              event={activity.event}
              communityLink={activity.communityLink}
              communityName={activity.communityName}
            />
          )}

      <Contents mt={2}>
        <Wrapper>{activity.preview}</Wrapper>
      </Contents>
    </FeedItem>
  );
};

export interface ActorProps {
  actor?: Actor;
  createdAt: string;
  event: string;
  communityName: string;
  communityLink: string;
}
export const ActorComp: FC<ActorProps> = ({
  actor,
  createdAt,
  event,
  communityName,
  communityLink
}) => {
  return (
    <Member>
      {actor && (
        <>
          <Avatar initials={actor.name} src={actor.icon} variant="avatar" />
          <MemberInfo ml={2}>
            <Flex mt={1} alignItems="center">
              <Flex flex={1}>
                <Name>
                  <Link to={actor.link}>{actor.name}</Link>
                </Name>
                <TextEvent
                  sx={{ textTransform: 'lowercase' }}
                  variant="text"
                  ml={1}
                >
                  {event}
                </TextEvent>
              </Flex>
            </Flex>
            <Flex sx={{ marginTop: '2px' }} alignItems="center">
              <Date>{DateTime.fromSQL(createdAt).toRelative()}</Date>
              <Spacer mx={1}>·</Spacer>
              <CommunityName to={communityLink}>{communityName}</CommunityName>
            </Flex>
          </MemberInfo>
        </>
      )}
    </Member>
  );
};

export interface SmallActorProps {
  actor: Actor;
  event: string;
}

export const SmallActorComp: FC<SmallActorProps> = ({ actor, event }) => {
  return (
    <Member sx={{ alignItems: 'center !important' }}>
      <Avatar
        size="s"
        initials={actor.name}
        src={actor.icon}
        variant="avatar"
      />
      <MemberInfo sx={{ marginTop: 0 }} ml={2}>
        <Flex alignItems="center">
          <Flex flex={1}>
            <Name>
              <Link to={actor.link}>{actor.name}</Link>
            </Name>
            <Text sx={{ textTransform: 'lowercase' }} variant="text" ml={1}>
              {event}
            </Text>
          </Flex>
        </Flex>
      </MemberInfo>
    </Member>
  );
};

const CommunityName = styled(Link)`
  color: ${props => props.theme.colors.mediumdark};
  font-weight: 500;
  font-size: ${typography.size.s1};
`;

const TextEvent = styled(Text)`
  color: ${props => props.theme.colors.dark};
`;

const Contents = styled(Box)``;

const Spacer = styled(Text)`
  color: ${props => props.theme.colors.mediumdark};
  font-weight: 500;
`;

const Date = styled(Text)`
  color: ${props => props.theme.colors.mediumdark};
  font-weight: 500;
  font-size: ${typography.size.s1};
`;

const Name = styled(Text)`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  flex-direction: row;
  a {
    font-weight: 800;
    display: flex;
    text-decoration: none;
    align-items: center;
    position: relative;
    z-index: 9;
    color: ${props => props.theme.colors.primary} !important;
  }
`;

const Member = styled(Flex)`
  align-items: stretch;
`;

const MemberInfo = styled(Box)`
  width: 100%;
  margin-top: -4px;
`;

const Wrapper = styled(Box)``;
const FeedItem = styled(Box)`
  position: relative;
  padding: 16px;
  word-wrap: break-word;
  font-size: 14px;
  ${clearFix()};
  transition: background 0.5s ease;
  margin-top: 0
  z-index: 10;
  position: relative;
  border-radius: 4px;
  background: ${props => props.theme.colors.appInverse};
  margin-bottom: 8px;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline
    }
  }

`;
