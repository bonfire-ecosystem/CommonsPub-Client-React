import * as Types from './types.generated';

import { BasicCommentWithInReplyToFragment } from './fragments/basicComment.generated';
import { ActivityPreviewFragment } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import gql from 'graphql-tag';
import { ActivityPreviewFragmentDoc } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import { BasicCommentWithInReplyToFragmentDoc } from './fragments/basicComment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



export type GetCommunityQueryQueryVariables = {
  communityId: Types.Scalars['String'],
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Array<Types.Scalars['Cursor']>>
};


export type GetCommunityQueryQuery = (
  { __typename: 'RootQueryType' }
  & { community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'createdAt' | 'updatedAt' | 'lastActivity' | 'isLocal' | 'isPublic' | 'isDisabled'>
    & { icon: Types.Maybe<(
      { __typename: 'Content' }
      & Pick<Types.Content, 'id' | 'url'>
    )>, creator: Types.Maybe<(
      { __typename: 'User' }
      & Pick<Types.User, 'id'>
    )>, myFollow: Types.Maybe<(
      { __typename: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )>, outbox: Types.Maybe<(
      { __typename: 'ActivitiesPage' }
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Activity' }
        & ActivityPreviewFragment
      )> }
    )>, threads: Types.Maybe<(
      { __typename: 'ThreadsPage' }
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Thread' }
        & Pick<Types.Thread, 'id' | 'canonicalUrl' | 'isLocal' | 'isPublic' | 'isHidden' | 'createdAt' | 'updatedAt' | 'lastActivity'>
        & { context: Types.Maybe<(
          { __typename: 'Collection' }
          & Pick<Types.Collection, 'id' | 'name'>
          & { icon: Types.Maybe<(
            { __typename: 'Content' }
            & Pick<Types.Content, 'id' | 'url'>
          )> }
        ) | (
          { __typename: 'Community' }
          & Pick<Types.Community, 'id' | 'name'>
          & { icon: Types.Maybe<(
            { __typename: 'Content' }
            & Pick<Types.Content, 'id' | 'url'>
          )> }
        ) | { __typename: 'Flag' } | (
          { __typename: 'Resource' }
          & Pick<Types.Resource, 'id' | 'name'>
          & { icon: Types.Maybe<(
            { __typename: 'Content' }
            & Pick<Types.Content, 'id' | 'url'>
          )> }
        )>, myFollow: Types.Maybe<(
          { __typename: 'Follow' }
          & Pick<Types.Follow, 'id'>
        )>, comments: Types.Maybe<(
          { __typename: 'CommentsPage' }
          & Pick<Types.CommentsPage, 'totalCount'>
          & { edges: Array<(
            { __typename: 'Comment' }
            & BasicCommentWithInReplyToFragment
          )> }
        )> }
      )> }
    )>, followers: Types.Maybe<(
      { __typename: 'FollowsPage' }
      & Pick<Types.FollowsPage, 'totalCount'>
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Follow' }
        & Pick<Types.Follow, 'id' | 'canonicalUrl' | 'isLocal' | 'isPublic'>
        & { creator: Types.Maybe<(
          { __typename: 'User' }
          & Pick<Types.User, 'id'>
          & { icon: Types.Maybe<(
            { __typename: 'Content' }
            & Pick<Types.Content, 'id' | 'url'>
          )> }
        )> }
      )> }
    )>, collections: Types.Maybe<(
      { __typename: 'CollectionsPage' }
      & Pick<Types.CollectionsPage, 'totalCount'>
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Collection' }
        & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary'>
        & { icon: Types.Maybe<(
          { __typename: 'Content' }
          & Pick<Types.Content, 'id' | 'url'>
        )>, myFollow: Types.Maybe<(
          { __typename: 'Follow' }
          & Pick<Types.Follow, 'id'>
        )>, likers: Types.Maybe<(
          { __typename: 'LikesPage' }
          & Pick<Types.LikesPage, 'totalCount'>
        )>, followers: Types.Maybe<(
          { __typename: 'FollowsPage' }
          & Pick<Types.FollowsPage, 'totalCount'>
        )>, resources: Types.Maybe<(
          { __typename: 'ResourcesPage' }
          & Pick<Types.ResourcesPage, 'totalCount'>
        )>, threads: Types.Maybe<(
          { __typename: 'ThreadsPage' }
          & Pick<Types.ThreadsPage, 'totalCount'>
        )> }
      )> }
    )> }
  )> }
);


export const GetCommunityQueryDocument = gql`
    query getCommunityQuery($communityId: String!, $limit: Int, $end: [Cursor!]) {
  community(communityId: $communityId) {
    id
    canonicalUrl
    preferredUsername
    name
    summary
    icon {
      id
      url
    }
    createdAt
    creator {
      id
    }
    updatedAt
    lastActivity
    isLocal
    isPublic
    isDisabled
    myFollow {
      id
    }
    outbox(limit: $limit, after: $end) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        ...ActivityPreview
      }
    }
    threads(limit: $limit, after: $end) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        id
        canonicalUrl
        isLocal
        isPublic
        isHidden
        createdAt
        updatedAt
        lastActivity
        context {
          __typename
          ... on Community {
            id
            icon {
              id
              url
            }
            name
          }
          ... on Collection {
            id
            icon {
              id
              url
            }
            name
          }
          ... on Resource {
            id
            icon {
              id
              url
            }
            name
          }
        }
        myFollow {
          id
        }
        comments {
          totalCount
          edges {
            ...BasicCommentWithInReplyTo
          }
        }
      }
    }
    followers {
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
      edges {
        id
        canonicalUrl
        isLocal
        isPublic
        creator {
          id
          icon {
            id
            url
          }
        }
      }
    }
    collections {
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
      edges {
        id
        canonicalUrl
        preferredUsername
        name
        summary
        icon {
          id
          url
        }
        myFollow {
          id
        }
        likers {
          totalCount
        }
        followers {
          totalCount
        }
        resources {
          totalCount
        }
        threads {
          totalCount
        }
      }
    }
  }
}
    ${ActivityPreviewFragmentDoc}
${BasicCommentWithInReplyToFragmentDoc}`;

/**
 * __useGetCommunityQueryQuery__
 *
 * To run a query within a React component, call `useGetCommunityQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityQueryQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetCommunityQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommunityQueryQuery, GetCommunityQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommunityQueryQuery, GetCommunityQueryQueryVariables>(GetCommunityQueryDocument, baseOptions);
      }
export function useGetCommunityQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommunityQueryQuery, GetCommunityQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommunityQueryQuery, GetCommunityQueryQueryVariables>(GetCommunityQueryDocument, baseOptions);
        }
export type GetCommunityQueryQueryHookResult = ReturnType<typeof useGetCommunityQueryQuery>;
export type GetCommunityQueryLazyQueryHookResult = ReturnType<typeof useGetCommunityQueryLazyQuery>;
export type GetCommunityQueryQueryResult = ApolloReactCommon.QueryResult<GetCommunityQueryQuery, GetCommunityQueryQueryVariables>;


export interface GetCommunityQueryQueryOperation {
  operationName: 'getCommunityQuery'
  result: GetCommunityQueryQuery
  variables: GetCommunityQueryQueryVariables
  type: 'query'
}
export const GetCommunityQueryQueryName:GetCommunityQueryQueryOperation['operationName'] = 'getCommunityQuery'

export const GetCommunityQueryQueryRefetch = (
  variables:GetCommunityQueryQueryVariables, 
  context?:any
)=>({
  query:GetCommunityQueryDocument,
  variables,
  context
})
      
