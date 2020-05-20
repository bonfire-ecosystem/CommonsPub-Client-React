import * as Types from '../types.generated';

import { BasicResourcesPageFragment } from './basicResourcesEdges.generated';
import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';
import { BasicResourcesPageFragmentDoc } from './basicResourcesEdges.generated';



export type BasicCollectionFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'isLocal' | 'isPublic' | 'createdAt'>
  & { creator: Types.Maybe<(
    { __typename: 'User' }
    & BasicUserFragment
  )>, icon: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl' | 'isLocal' | 'isPublic' | 'name'>
    & { icon: Types.Maybe<(
      { __typename: 'Content' }
      & Pick<Types.Content, 'id' | 'url'>
    )>, myFollow: Types.Maybe<(
      { __typename: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )>, myFlag: Types.Maybe<(
      { __typename: 'Flag' }
      & Pick<Types.Flag, 'id'>
    )> }
  )>, resources: Types.Maybe<(
    { __typename: 'ResourcesPage' }
    & BasicResourcesPageFragment
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

export const BasicCollectionFragmentDoc = gql`
    fragment BasicCollection on Collection {
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
  isLocal
  isPublic
  createdAt
  myLike {
    id
  }
  myFollow {
    id
  }
  myFlag {
    id
  }
  community {
    id
    canonicalUrl
    isLocal
    isPublic
    name
    icon {
      id
      url
    }
    myFollow {
      id
    }
    myFlag {
      id
    }
  }
  resources {
    ...BasicResourcesPage
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
    ${BasicUserFragmentDoc}
${BasicResourcesPageFragmentDoc}`;
