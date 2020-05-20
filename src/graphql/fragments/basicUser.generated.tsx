import * as Types from '../types.generated';

import gql from 'graphql-tag';

export type BasicUserFragment = (
  { __typename: 'User' }
  & Pick<Types.User, 'id' | 'canonicalUrl' | 'displayUsername' | 'name' | 'location' | 'summary' | 'isLocal' | 'createdAt' | 'updatedAt' | 'lastActivity'>
  & { icon: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, image: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, myLike: Types.Maybe<(
    { __typename: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )> }
);

export const BasicUserFragmentDoc = gql`
    fragment BasicUser on User {
  id
  canonicalUrl
  displayUsername
  name
  icon {
    id
    url
  }
  location
  summary
  image {
    id
    url
  }
  isLocal
  createdAt
  updatedAt
  lastActivity
  myFollow {
    id
  }
  myLike {
    id
  }
  myFlag {
    id
  }
}
    `;
