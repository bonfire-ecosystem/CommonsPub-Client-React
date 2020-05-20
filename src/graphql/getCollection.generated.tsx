import * as Types from './types.generated';

import { BasicCollectionFragment } from './fragments/basicCollection.generated';
import gql from 'graphql-tag';
import { BasicCollectionFragmentDoc } from './fragments/basicCollection.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type GetCollectionQueryVariables = {
  id: Types.Scalars['String']
};


export type GetCollectionQuery = (
  { __typename: 'RootQueryType' }
  & { collection: Types.Maybe<(
    { __typename: 'Collection' }
    & BasicCollectionFragment
  )> }
);


export const GetCollectionDocument = gql`
    query getCollection($id: String!) {
  collection(collectionId: $id) {
    ...BasicCollection
  }
}
    ${BasicCollectionFragmentDoc}`;

/**
 * __useGetCollectionQuery__
 *
 * To run a query within a React component, call `useGetCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, baseOptions);
      }
export function useGetCollectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, baseOptions);
        }
export type GetCollectionQueryHookResult = ReturnType<typeof useGetCollectionQuery>;
export type GetCollectionLazyQueryHookResult = ReturnType<typeof useGetCollectionLazyQuery>;
export type GetCollectionQueryResult = ApolloReactCommon.QueryResult<GetCollectionQuery, GetCollectionQueryVariables>;


export interface GetCollectionQueryOperation {
  operationName: 'getCollection'
  result: GetCollectionQuery
  variables: GetCollectionQueryVariables
  type: 'query'
}
export const GetCollectionQueryName:GetCollectionQueryOperation['operationName'] = 'getCollection'

export const GetCollectionQueryRefetch = (
  variables:GetCollectionQueryVariables, 
  context?:any
)=>({
  query:GetCollectionDocument,
  variables,
  context
})
      
