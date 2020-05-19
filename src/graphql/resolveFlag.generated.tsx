import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ResolveFlagMutationMutationVariables = {
  flagId: Types.Scalars['String']
};


export type ResolveFlagMutationMutation = (
  { __typename: 'RootMutationType' }
  & { resolveFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & { context: { __typename: 'Collection' } | { __typename: 'Comment' } | { __typename: 'Community' } | { __typename: 'Resource' } | { __typename: 'User' } }
  )> }
);


export const ResolveFlagMutationDocument = gql`
    mutation resolveFlagMutation($flagId: String!) {
  resolveFlag(flagId: $flagId) {
    context {
      __typename
    }
  }
}
    `;
export type ResolveFlagMutationMutationFn = ApolloReactCommon.MutationFunction<ResolveFlagMutationMutation, ResolveFlagMutationMutationVariables>;

/**
 * __useResolveFlagMutationMutation__
 *
 * To run a mutation, you first call `useResolveFlagMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveFlagMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveFlagMutationMutation, { data, loading, error }] = useResolveFlagMutationMutation({
 *   variables: {
 *      flagId: // value for 'flagId'
 *   },
 * });
 */
export function useResolveFlagMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResolveFlagMutationMutation, ResolveFlagMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<ResolveFlagMutationMutation, ResolveFlagMutationMutationVariables>(ResolveFlagMutationDocument, baseOptions);
      }
export type ResolveFlagMutationMutationHookResult = ReturnType<typeof useResolveFlagMutationMutation>;
export type ResolveFlagMutationMutationResult = ApolloReactCommon.MutationResult<ResolveFlagMutationMutation>;
export type ResolveFlagMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<ResolveFlagMutationMutation, ResolveFlagMutationMutationVariables>;


export interface ResolveFlagMutationMutationOperation {
  operationName: 'resolveFlagMutation'
  result: ResolveFlagMutationMutation
  variables: ResolveFlagMutationMutationVariables
  type: 'mutation'
}
export const ResolveFlagMutationMutationName:ResolveFlagMutationMutationOperation['operationName'] = 'resolveFlagMutation'

export const ResolveFlagMutationMutationRefetch = (
  variables:ResolveFlagMutationMutationVariables, 
  context?:any
)=>({
  query:ResolveFlagMutationDocument,
  variables,
  context
})
      
