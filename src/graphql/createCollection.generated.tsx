import * as Types from './types.generated';

import { BasicCollectionFragment } from './fragments/basicCollection.generated';
import gql from 'graphql-tag';
import { BasicCollectionFragmentDoc } from './fragments/basicCollection.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type CreateCollectionMutationMutationVariables = {
  communityId: Types.Scalars['String'],
  collection: Types.CollectionInput
};


export type CreateCollectionMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createCollection: Types.Maybe<(
    { __typename: 'Collection' }
    & BasicCollectionFragment
  )> }
);


export const CreateCollectionMutationDocument = gql`
    mutation createCollectionMutation($communityId: String!, $collection: CollectionInput!) {
  createCollection(communityId: $communityId, collection: $collection) {
    ...BasicCollection
  }
}
    ${BasicCollectionFragmentDoc}`;
export type CreateCollectionMutationMutationFn = ApolloReactCommon.MutationFunction<CreateCollectionMutationMutation, CreateCollectionMutationMutationVariables>;

/**
 * __useCreateCollectionMutationMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutationMutation, { data, loading, error }] = useCreateCollectionMutationMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useCreateCollectionMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCollectionMutationMutation, CreateCollectionMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCollectionMutationMutation, CreateCollectionMutationMutationVariables>(CreateCollectionMutationDocument, baseOptions);
      }
export type CreateCollectionMutationMutationHookResult = ReturnType<typeof useCreateCollectionMutationMutation>;
export type CreateCollectionMutationMutationResult = ApolloReactCommon.MutationResult<CreateCollectionMutationMutation>;
export type CreateCollectionMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCollectionMutationMutation, CreateCollectionMutationMutationVariables>;


export interface CreateCollectionMutationMutationOperation {
  operationName: 'createCollectionMutation'
  result: CreateCollectionMutationMutation
  variables: CreateCollectionMutationMutationVariables
  type: 'mutation'
}
export const CreateCollectionMutationMutationName:CreateCollectionMutationMutationOperation['operationName'] = 'createCollectionMutation'

export const CreateCollectionMutationMutationRefetch = (
  variables:CreateCollectionMutationMutationVariables, 
  context?:any
)=>({
  query:CreateCollectionMutationDocument,
  variables,
  context
})
      
