import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type FetchResourceMutationVariables = {
  url: Types.Scalars['String']
};


export type FetchResourceMutation = (
  { __typename: 'RootMutationType' }
  & { fetchWebMetadata: Types.Maybe<(
    { __typename: 'WebMetadata' }
    & Pick<Types.WebMetadata, 'url' | 'image' | 'title' | 'author' | 'source' | 'mimeType' | 'summary' | 'embedType' | 'embedCode' | 'language'>
  )> }
);


export const FetchResourceDocument = gql`
    mutation fetchResource($url: String!) {
  fetchWebMetadata(url: $url) {
    url
    image
    title
    author
    source
    mimeType
    summary
    embedType
    embedCode
    language
  }
}
    `;
export type FetchResourceMutationFn = ApolloReactCommon.MutationFunction<FetchResourceMutation, FetchResourceMutationVariables>;

/**
 * __useFetchResourceMutation__
 *
 * To run a mutation, you first call `useFetchResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchResourceMutation, { data, loading, error }] = useFetchResourceMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useFetchResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FetchResourceMutation, FetchResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<FetchResourceMutation, FetchResourceMutationVariables>(FetchResourceDocument, baseOptions);
      }
export type FetchResourceMutationHookResult = ReturnType<typeof useFetchResourceMutation>;
export type FetchResourceMutationResult = ApolloReactCommon.MutationResult<FetchResourceMutation>;
export type FetchResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<FetchResourceMutation, FetchResourceMutationVariables>;


export interface FetchResourceMutationOperation {
  operationName: 'fetchResource'
  result: FetchResourceMutation
  variables: FetchResourceMutationVariables
  type: 'mutation'
}
export const FetchResourceMutationName:FetchResourceMutationOperation['operationName'] = 'fetchResource'

export const FetchResourceMutationRefetch = (
  variables:FetchResourceMutationVariables, 
  context?:any
)=>({
  query:FetchResourceDocument,
  variables,
  context
})
      
