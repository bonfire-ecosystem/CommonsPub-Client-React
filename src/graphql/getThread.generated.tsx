import * as Types from './types.generated';

import { CommunityPageThreadFragment } from '../HOC/pages/community/CommunityPage.generated';
import gql from 'graphql-tag';
import { CommunityPageThreadFragmentDoc } from '../HOC/pages/community/CommunityPage.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type GetThreadQueryVariables = {
  threadId: Types.Scalars['String']
};


export type GetThreadQuery = (
  { __typename: 'RootQueryType' }
  & { thread: Types.Maybe<(
    { __typename: 'Thread' }
    & CommunityPageThreadFragment
  )> }
);


export const GetThreadDocument = gql`
    query getThread($threadId: String!) {
  thread(threadId: $threadId) {
    ...CommunityPageThread
  }
}
    ${CommunityPageThreadFragmentDoc}`;

/**
 * __useGetThreadQuery__
 *
 * To run a query within a React component, call `useGetThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useGetThreadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
        return ApolloReactHooks.useQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, baseOptions);
      }
export function useGetThreadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, baseOptions);
        }
export type GetThreadQueryHookResult = ReturnType<typeof useGetThreadQuery>;
export type GetThreadLazyQueryHookResult = ReturnType<typeof useGetThreadLazyQuery>;
export type GetThreadQueryResult = ApolloReactCommon.QueryResult<GetThreadQuery, GetThreadQueryVariables>;


export interface GetThreadQueryOperation {
  operationName: 'getThread'
  result: GetThreadQuery
  variables: GetThreadQueryVariables
  type: 'query'
}
export const GetThreadQueryName:GetThreadQueryOperation['operationName'] = 'getThread'

export const GetThreadQueryRefetch = (
  variables:GetThreadQueryVariables, 
  context?:any
)=>({
  query:GetThreadDocument,
  variables,
  context
})
      
