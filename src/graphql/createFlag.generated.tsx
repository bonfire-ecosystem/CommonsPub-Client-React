import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateFlagMutationMutationVariables = {
  contextId: Types.Scalars['String'],
  message: Types.Scalars['String']
};


export type CreateFlagMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & { context: { __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Resource' } | { __typename: 'User' } }
  )> }
);


export const CreateFlagMutationDocument = gql`
    mutation createFlagMutation($contextId: String!, $message: String!) {
  createFlag(contextId: $contextId, message: $message) {
    context {
      __typename
    }
  }
}
    `;
export type CreateFlagMutationMutationFn = ApolloReactCommon.MutationFunction<CreateFlagMutationMutation, CreateFlagMutationMutationVariables>;

/**
 * __useCreateFlagMutationMutation__
 *
 * To run a mutation, you first call `useCreateFlagMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFlagMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFlagMutationMutation, { data, loading, error }] = useCreateFlagMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateFlagMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFlagMutationMutation, CreateFlagMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFlagMutationMutation, CreateFlagMutationMutationVariables>(CreateFlagMutationDocument, baseOptions);
      }
export type CreateFlagMutationMutationHookResult = ReturnType<typeof useCreateFlagMutationMutation>;
export type CreateFlagMutationMutationResult = ApolloReactCommon.MutationResult<CreateFlagMutationMutation>;
export type CreateFlagMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFlagMutationMutation, CreateFlagMutationMutationVariables>;


export interface CreateFlagMutationMutationOperation {
  operationName: 'createFlagMutation'
  result: CreateFlagMutationMutation
  variables: CreateFlagMutationMutationVariables
  type: 'mutation'
}
export const CreateFlagMutationMutationName:CreateFlagMutationMutationOperation['operationName'] = 'createFlagMutation'

export const CreateFlagMutationMutationRefetch = (
  variables:CreateFlagMutationMutationVariables, 
  context?:any
)=>({
  query:CreateFlagMutationDocument,
  variables,
  context
})
      
