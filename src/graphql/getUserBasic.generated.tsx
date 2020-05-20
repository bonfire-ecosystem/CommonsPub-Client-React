import * as Types from './types.generated';

import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type GetUserBasicQueryVariables = {};


export type GetUserBasicQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'email'>
    & { user: (
      { __typename: 'User' }
      & BasicUserFragment
    ) }
  )> }
);


export const GetUserBasicDocument = gql`
    query getUserBasic {
  me {
    email
    user {
      ...BasicUser
    }
  }
}
    ${BasicUserFragmentDoc}`;

/**
 * __useGetUserBasicQuery__
 *
 * To run a query within a React component, call `useGetUserBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserBasicQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, baseOptions);
      }
export function useGetUserBasicLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, baseOptions);
        }
export type GetUserBasicQueryHookResult = ReturnType<typeof useGetUserBasicQuery>;
export type GetUserBasicLazyQueryHookResult = ReturnType<typeof useGetUserBasicLazyQuery>;
export type GetUserBasicQueryResult = ApolloReactCommon.QueryResult<GetUserBasicQuery, GetUserBasicQueryVariables>;


export interface GetUserBasicQueryOperation {
  operationName: 'getUserBasic'
  result: GetUserBasicQuery
  variables: GetUserBasicQueryVariables
  type: 'query'
}
export const GetUserBasicQueryName:GetUserBasicQueryOperation['operationName'] = 'getUserBasic'

export const GetUserBasicQueryRefetch = (
  variables:GetUserBasicQueryVariables, 
  context?:any
)=>({
  query:GetUserBasicDocument,
  variables,
  context
})
      
