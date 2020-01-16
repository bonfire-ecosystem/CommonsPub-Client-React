import { Trans } from '@lingui/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';
import { Actor } from './types';
import { Box } from 'rebass';
export enum ContextVerb {
  Updated,
  Created,
  Like,
  Follow,
  Flag
}
export enum ContextType {
  Comment,
  Collection,
  Community,
  User,
  Resource
}

export interface IContext {
  type: ContextType;
  verb: ContextVerb;
  link: string;
}

export interface ConcreteContext extends IContext {
  type:
    | ContextType.Collection
    | ContextType.Community
    | ContextType.Resource
    | ContextType.User;
  icon: string;
  title: string;
}

export interface CommentContext extends IContext {
  type: ContextType.Comment;
  content: string;
}

export interface UserContext extends IContext, Actor {
  type: ContextType.User;
}

export type Context = CommentContext | ConcreteContext | UserContext;

const SmallPreview: React.SFC<ConcreteContext> = context => (
  <Flex alignItems="center">
    <Text mr={2} variant="link">
      {context.verb === ContextVerb.Follow ? (
        <Trans>Followed</Trans>
      ) : context.verb === ContextVerb.Like ? (
        <Trans>Liked</Trans>
      ) : context.verb === ContextVerb.Flag ? (
        <Trans>Flagged</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Collection ? (
        <Trans>Created the collection</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Community ? (
        <Trans>Created the community</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Resource ? (
        <Trans>Created the resource</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Collection ? (
        <Trans>Updated the collection</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Community ? (
        <Trans>Updated the community</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Resource ? (
        <Trans>Updated the resource</Trans>
      ) : null}
    </Text>
    <WrapperPreview>
      <Avatar src={context.icon} initials={context.title} />
      <Title ml={2}>{context.title}</Title>
    </WrapperPreview>
  </Flex>
);

const Preview: React.FC<Context> = context => {
  const { link } = context;
  return (
    <Wrapper>
      <WrapperLink to={link}>
        {context.type === ContextType.Comment ? (
          <Comment variant="text">{context.content}</Comment>
        ) : context.type === ContextType.User ? (
          <pre>
            USER:
            {JSON.stringify(context, null, 4)}
          </pre>
        ) : (
          <SmallPreview {...context} />
        )}
      </WrapperLink>
    </Wrapper>
  );
};

export type InReplyToContext = {
  actor: null | Actor;
  icon: string;
  link: string;
  desc: string;
};
export const InReplyTo: React.SFC<InReplyToContext> = context => {
  return (
    <FlexPreview>
      <NavLink to={context.link}>
        <Flex>
          <WrapperPreview>
            {context.actor && (
              <Avatar src={context.actor.icon} initials={context.actor.name} />
            )}
            <Title ml={2}>{context.desc}</Title>
          </WrapperPreview>

          {/* <TextConnector variant="link">
            {context.verb === ContextVerb.Follow ? (
              <Trans>followed</Trans>
            ) : context.verb === ContextVerb.Like ? (
              <Trans>liked</Trans>
            ) : context.verb === ContextVerb.Flag ? (
              <Trans>flagged</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Collection ? (
              <Trans>created the collection</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Community ? (
              <Trans>created the community</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Resource ? (
              <Trans>created the resource</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Collection ? (
              <Trans>updated the collection</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Community ? (
              <Trans>updated the community</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Resource ? (
              <Trans>updated the resource</Trans>
            ) : null}
          </TextConnector> 
          {context.type === ContextType.Comment
            ? <Comment variant="text">{context.content}</Comment>
            : <WrapperPreview>
              <Avatar
                src={context.icon}
                initials={context.actor.name}
              />
              <Title ml={2}>{context.actor.name}</Title>
            </WrapperPreview>
          }*/}
        </Flex>
      </NavLink>
    </FlexPreview>
  );
};

// const InReply = styled(Text)`
//   padding-bottom: 0;
//   display: inline-block;
//   font-weight: 500;
//   font-size: 13px;
//   color: ${props => props.theme.colors.gray};
//   a {
//     color: ${props => props.theme.colors.orange} !important;
//     font-weight: 600;
//   }
// `;

// const TextConnector = styled(Text)`
//   margin-left: 6px;
//   margin-right: 6px;
//   height: 30px;
//   line-height: 30px;
// `;
const WrapperPreview = styled(Flex)`
  div:first-of-type {
    width: 28px;
    height: 28px;
  }
  align-items: center;
`;

const FlexPreview = styled(Box)`
  align-items: center;
  border: 1px solid ${props => props.theme.colors.lightgray};
  background: #eceff2;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    left: 10px;
    height: 16px;
    bottom: -17px;
    width: 3px;
    display: block;
    background: ${props => props.theme.colors.lightgray};
  }
`;

const Comment = styled(Text)`
  & a {
    color: ${props => props.theme.colors.darkgray} !important;
    font-weight: 400 !important;
    font-size: 14px;
    text-decoration: none;
    line-height: 20px;
  }
`;

const WrapperLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  position: relative;
  z-index: 999999;
  padding: 8px;
  &.connector {
    background: ${props => props.theme.colors.lightgray};
  }
  &:hover {
    background: rgb(245, 248, 250);
    text-decoration: none !important;
  }
`;

const Wrapper = styled.div`
  ${media.lessThan('medium')`
  display: block;
  padding: 0;
  padding: 20px;
  a {
    
    }
  }
  `};
`;

const Title = styled(Text)`
  font-size: 14px !important;
  line-height: 22px !important;
  flex: 1;
  font-weight: 800;
  color: ${props => props.theme.colors.darkgray};
  ${media.lessThan('medium')`
  line-height: 20px !important;
`};
`;

export default Preview;
