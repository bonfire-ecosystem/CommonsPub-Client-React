import * as Types from './types.generated';

import { BasicCommunityFragment } from './fragments/basicCommunity.generated';
import gql from 'graphql-tag';
import { BasicCommunityFragmentDoc } from './fragments/basicCommunity.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type GetCommunitiesQueryQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Array<Types.Scalars['Cursor']>>
};


export type GetCommunitiesQueryQuery = (
  { __typename: 'RootQueryType' }
  & { communities: (
    { __typename: 'CommunitiesPage' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename: 'Community' }
      & BasicCommunityFragment
    )> }
  ) }
);


export const GetCommunitiesQueryDocument = gql`
    query getCommunitiesQuery($limit: Int, $end: [Cursor!]) {
  communities(limit: $limit, after: $end) {
    pageInfo {
      startCursor
      endCursor
    }
    edges {
      ...BasicCommunity
    }
  }
}
    ${BasicCommunityFragmentDoc}`;

/**
 * __useGetCommunitiesQueryQuery__
 *
 * To run a query within a React component, call `useGetCommunitiesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunitiesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunitiesQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetCommunitiesQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommunitiesQueryQuery, GetCommunitiesQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommunitiesQueryQuery, GetCommunitiesQueryQueryVariables>(GetCommunitiesQueryDocument, baseOptions);
      }
export function useGetCommunitiesQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommunitiesQueryQuery, GetCommunitiesQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommunitiesQueryQuery, GetCommunitiesQueryQueryVariables>(GetCommunitiesQueryDocument, baseOptions);
        }
export type GetCommunitiesQueryQueryHookResult = ReturnType<typeof useGetCommunitiesQueryQuery>;
export type GetCommunitiesQueryLazyQueryHookResult = ReturnType<typeof useGetCommunitiesQueryLazyQuery>;
export type GetCommunitiesQueryQueryResult = ApolloReactCommon.QueryResult<GetCommunitiesQueryQuery, GetCommunitiesQueryQueryVariables>;


export interface GetCommunitiesQueryQueryOperation {
  operationName: 'getCommunitiesQuery'
  result: GetCommunitiesQueryQuery
  variables: GetCommunitiesQueryQueryVariables
  type: 'query'
}
export const GetCommunitiesQueryQueryName:GetCommunitiesQueryQueryOperation['operationName'] = 'getCommunitiesQuery'

export const GetCommunitiesQueryQueryRefetch = (
  variables:GetCommunitiesQueryQueryVariables, 
  context?:any
)=>({
  query:GetCommunitiesQueryDocument,
  variables,
  context
})
      
