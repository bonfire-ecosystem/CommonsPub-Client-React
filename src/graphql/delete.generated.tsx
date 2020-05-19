import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeleteMutationMutationVariables = {
  contextId: Types.Scalars['String']
};


export type DeleteMutationMutation = (
  { __typename: 'RootMutationType' }
  & { delete: Types.Maybe<{ __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Feature' } | { __typename: 'Flag' } | { __typename: 'Follow' } | { __typename: 'Like' } | { __typename: 'Resource' } | { __typename: 'Thread' } | { __typename: 'User' }> }
);


export const DeleteMutationDocument = gql`
    mutation deleteMutation($contextId: String!) {
  delete(contextId: $contextId) {
    __typename
  }
}
    `;
export type DeleteMutationMutationFn = ApolloReactCommon.MutationFunction<DeleteMutationMutation, DeleteMutationMutationVariables>;

/**
 * __useDeleteMutationMutation__
 *
 * To run a mutation, you first call `useDeleteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutationMutation, { data, loading, error }] = useDeleteMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useDeleteMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMutationMutation, DeleteMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMutationMutation, DeleteMutationMutationVariables>(DeleteMutationDocument, baseOptions);
      }
export type DeleteMutationMutationHookResult = ReturnType<typeof useDeleteMutationMutation>;
export type DeleteMutationMutationResult = ApolloReactCommon.MutationResult<DeleteMutationMutation>;
export type DeleteMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMutationMutation, DeleteMutationMutationVariables>;


export interface DeleteMutationMutationOperation {
  operationName: 'deleteMutation'
  result: DeleteMutationMutation
  variables: DeleteMutationMutationVariables
  type: 'mutation'
}
export const DeleteMutationMutationName:DeleteMutationMutationOperation['operationName'] = 'deleteMutation'

export const DeleteMutationMutationRefetch = (
  variables:DeleteMutationMutationVariables, 
  context?:any
)=>({
  query:DeleteMutationDocument,
  variables,
  context
})
      
