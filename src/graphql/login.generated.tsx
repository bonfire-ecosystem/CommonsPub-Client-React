import * as Types from './types.generated';

import { BasicAuthPayloadFragment } from './fragments/basicAuthPayload.generated';
import gql from 'graphql-tag';
import { BasicAuthPayloadFragmentDoc } from './fragments/basicAuthPayload.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type LoginMutationMutationVariables = {
  email: Types.Scalars['String'],
  password: Types.Scalars['String']
};


export type LoginMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createSession: Types.Maybe<(
    { __typename: 'AuthPayload' }
    & BasicAuthPayloadFragment
  )> }
);


export const LoginMutationDocument = gql`
    mutation loginMutation($email: String!, $password: String!) {
  createSession(email: $email, password: $password) {
    ...BasicAuthPayload
  }
}
    ${BasicAuthPayloadFragmentDoc}`;
export type LoginMutationMutationFn = ApolloReactCommon.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, baseOptions);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = ApolloReactCommon.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;


export interface LoginMutationMutationOperation {
  operationName: 'loginMutation'
  result: LoginMutationMutation
  variables: LoginMutationMutationVariables
  type: 'mutation'
}
export const LoginMutationMutationName:LoginMutationMutationOperation['operationName'] = 'loginMutation'

export const LoginMutationMutationRefetch = (
  variables:LoginMutationMutationVariables, 
  context?:any
)=>({
  query:LoginMutationDocument,
  variables,
  context
})
      
