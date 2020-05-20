import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MeQueryQueryVariables = {};


export type MeQueryQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'email'>
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'location' | 'summary' | 'website' | 'isLocal' | 'isPublic' | 'isDisabled' | 'createdAt' | 'updatedAt' | 'lastActivity'>
      & { icon: Types.Maybe<(
        { __typename: 'Content' }
        & Pick<Types.Content, 'id' | 'url'>
      )>, image: Types.Maybe<(
        { __typename: 'Content' }
        & Pick<Types.Content, 'id' | 'url'>
      )> }
    ) }
  )> }
);


export const MeQueryDocument = gql`
    query meQuery {
  me {
    email
    user {
      id
      canonicalUrl
      preferredUsername
      name
      location
      icon {
        id
        url
      }
      image {
        id
        url
      }
      summary
      location
      website
      isLocal
      isPublic
      isDisabled
      createdAt
      updatedAt
      lastActivity
    }
  }
}
    `;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, baseOptions);
      }
export function useMeQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, baseOptions);
        }
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQueryQueryResult = ApolloReactCommon.QueryResult<MeQueryQuery, MeQueryQueryVariables>;


export interface MeQueryQueryOperation {
  operationName: 'meQuery'
  result: MeQueryQuery
  variables: MeQueryQueryVariables
  type: 'query'
}
export const MeQueryQueryName:MeQueryQueryOperation['operationName'] = 'meQuery'

export const MeQueryQueryRefetch = (
  variables:MeQueryQueryVariables, 
  context?:any
)=>({
  query:MeQueryDocument,
  variables,
  context
})
      
