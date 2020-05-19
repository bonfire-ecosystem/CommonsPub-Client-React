import * as Types from './types.generated';

import { BasicCommunityFragment } from './fragments/basicCommunity.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { BasicCommunityFragmentDoc } from './fragments/basicCommunity.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



export type GetFeaturedCommunitiesQueryVariables = {};


export type GetFeaturedCommunitiesQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & { featuredCommunities: Types.Maybe<(
      { __typename: 'FeaturesPage' }
      & Pick<Types.FeaturesPage, 'totalCount'>
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Feature' }
        & Pick<Types.Feature, 'id' | 'canonicalUrl' | 'isLocal' | 'createdAt'>
        & { creator: Types.Maybe<(
          { __typename: 'User' }
          & BasicUserFragment
        )>, context: Types.Maybe<{ __typename: 'Collection' } | (
          { __typename: 'Community' }
          & BasicCommunityFragment
        )> }
      )> }
    )> }
  )> }
);


export const GetFeaturedCommunitiesDocument = gql`
    query getFeaturedCommunities {
  instance {
    featuredCommunities {
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
      edges {
        id
        canonicalUrl
        isLocal
        createdAt
        creator {
          ...BasicUser
        }
        context {
          __typename
          ... on Community {
            ...BasicCommunity
          }
        }
      }
    }
  }
}
    ${BasicUserFragmentDoc}
${BasicCommunityFragmentDoc}`;

/**
 * __useGetFeaturedCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetFeaturedCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturedCommunitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>(GetFeaturedCommunitiesDocument, baseOptions);
      }
export function useGetFeaturedCommunitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>(GetFeaturedCommunitiesDocument, baseOptions);
        }
export type GetFeaturedCommunitiesQueryHookResult = ReturnType<typeof useGetFeaturedCommunitiesQuery>;
export type GetFeaturedCommunitiesLazyQueryHookResult = ReturnType<typeof useGetFeaturedCommunitiesLazyQuery>;
export type GetFeaturedCommunitiesQueryResult = ApolloReactCommon.QueryResult<GetFeaturedCommunitiesQuery, GetFeaturedCommunitiesQueryVariables>;


export interface GetFeaturedCommunitiesQueryOperation {
  operationName: 'getFeaturedCommunities'
  result: GetFeaturedCommunitiesQuery
  variables: GetFeaturedCommunitiesQueryVariables
  type: 'query'
}
export const GetFeaturedCommunitiesQueryName:GetFeaturedCommunitiesQueryOperation['operationName'] = 'getFeaturedCommunities'

export const GetFeaturedCommunitiesQueryRefetch = (
  variables:GetFeaturedCommunitiesQueryVariables, 
  context?:any
)=>({
  query:GetFeaturedCommunitiesDocument,
  variables,
  context
})
      
