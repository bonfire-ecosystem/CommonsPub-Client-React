import * as Types from '../../../../graphql/types.generated';

import gql from 'graphql-tag';

export type CommunityPreviewFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'summary' | 'collectionCount' | 'followerCount'>
  & { icon: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, threads: Types.Maybe<(
    { __typename: 'ThreadsPage' }
    & Pick<Types.ThreadsPage, 'totalCount'>
  )> }
  & CommunityInfoFragment
);

export type CommunityInfoFragment = (
  { __typename: 'Community' }
  & Pick<Types.Community, 'id' | 'name' | 'isLocal' | 'canonicalUrl' | 'displayUsername'>
  & { icon: Types.Maybe<(
    { __typename: 'Content' }
    & Pick<Types.Content, 'id' | 'url'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )> }
);

export const CommunityInfoFragmentDoc = gql`
    fragment CommunityInfo on Community {
  id
  name
  icon {
    id
    url
  }
  isLocal
  myFollow {
    id
  }
  canonicalUrl
  displayUsername
}
    `;
export const CommunityPreviewFragmentDoc = gql`
    fragment CommunityPreview on Community {
  ...CommunityInfo
  id
  icon {
    id
    url
  }
  summary
  myFlag {
    id
  }
  collectionCount
  followerCount
  threads {
    totalCount
  }
}
    ${CommunityInfoFragmentDoc}`;
