import * as Types from '../types.generated';

import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';


export type BasicCommunityFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'createdAt' | 'updatedAt' | 'lastActivity' | 'isLocal' | 'isPublic' | 'isDisabled'>
  & { creator: Types.Maybe<(
    { __typename: 'User' }
    & BasicUserFragment
  )>, icon: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, collections: Types.Maybe<(
    { __typename: 'CollectionsPage' }
    & Pick<Types.CollectionsPage, 'totalCount'>
  )>, followers: Types.Maybe<(
    { __typename: 'FollowsPage' }
    & Pick<Types.FollowsPage, 'totalCount'>
  )>, threads: Types.Maybe<(
    { __typename: 'ThreadsPage' }
    & Pick<Types.ThreadsPage, 'totalCount'>
  )>, outbox: Types.Maybe<(
    { __typename: 'ActivitiesPage' }
    & Pick<Types.ActivitiesPage, 'totalCount'>
  )> }
);

export const BasicCommunityFragmentDoc = gql`
    fragment BasicCommunity on Community {
  id
  canonicalUrl
  preferredUsername
  name
  summary
  creator {
    ...BasicUser
  }
  icon {
    id
    url
  }
  createdAt
  updatedAt
  lastActivity
  isLocal
  isPublic
  isDisabled
  myFollow {
    id
  }
  myFlag {
    id
  }
  collections {
    totalCount
  }
  followers {
    totalCount
  }
  threads {
    totalCount
  }
  outbox {
    totalCount
  }
}
    ${BasicUserFragmentDoc}`;
