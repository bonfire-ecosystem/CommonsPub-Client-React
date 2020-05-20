import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ResetPasswordMutationVariables = {
  password: Types.Scalars['String'],
  token: Types.Scalars['String']
};


export type ResetPasswordMutation = (
  { __typename: 'RootMutationType' }
  & { resetPassword: Types.Maybe<(
    { __typename: 'AuthPayload' }
    & Pick<Types.AuthPayload, 'token'>
  )> }
);


export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $token: String!) {
  resetPassword(password: $password, token: $token) {
    token
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;


export interface ResetPasswordMutationOperation {
  operationName: 'resetPassword'
  result: ResetPasswordMutation
  variables: ResetPasswordMutationVariables
  type: 'mutation'
}
export const ResetPasswordMutationName:ResetPasswordMutationOperation['operationName'] = 'resetPassword'

export const ResetPasswordMutationRefetch = (
  variables:ResetPasswordMutationVariables, 
  context?:any
)=>({
  query:ResetPasswordDocument,
  variables,
  context
})
      
