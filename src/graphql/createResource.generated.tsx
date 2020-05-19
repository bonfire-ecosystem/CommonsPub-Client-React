import * as Types from './types.generated';

import { BasicResourceFragment } from './fragments/basicResource.generated';
import gql from 'graphql-tag';
import { BasicResourceFragmentDoc } from './fragments/basicResource.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type CreateResourceMutationMutationVariables = {
  collectionId: Types.Scalars['String'],
  resource: Types.ResourceInput,
  icon?: Types.Maybe<Types.UploadInput>,
  content: Types.UploadInput
};


export type CreateResourceMutationMutation = (
  { __typename: 'RootMutationType' }
  & { createResource: Types.Maybe<(
    { __typename: 'Resource' }
    & BasicResourceFragment
  )> }
);


export const CreateResourceMutationDocument = gql`
    mutation createResourceMutation($collectionId: String!, $resource: ResourceInput!, $icon: UploadInput, $content: UploadInput!) {
  createResource(collectionId: $collectionId, resource: $resource, content: $content, icon: $icon) {
    ...BasicResource
  }
}
    ${BasicResourceFragmentDoc}`;
export type CreateResourceMutationMutationFn = ApolloReactCommon.MutationFunction<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>;

/**
 * __useCreateResourceMutationMutation__
 *
 * To run a mutation, you first call `useCreateResourceMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceMutationMutation, { data, loading, error }] = useCreateResourceMutationMutation({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *      resource: // value for 'resource'
 *      icon: // value for 'icon'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateResourceMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>(CreateResourceMutationDocument, baseOptions);
      }
export type CreateResourceMutationMutationHookResult = ReturnType<typeof useCreateResourceMutationMutation>;
export type CreateResourceMutationMutationResult = ApolloReactCommon.MutationResult<CreateResourceMutationMutation>;
export type CreateResourceMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateResourceMutationMutation, CreateResourceMutationMutationVariables>;


export interface CreateResourceMutationMutationOperation {
  operationName: 'createResourceMutation'
  result: CreateResourceMutationMutation
  variables: CreateResourceMutationMutationVariables
  type: 'mutation'
}
export const CreateResourceMutationMutationName:CreateResourceMutationMutationOperation['operationName'] = 'createResourceMutation'

export const CreateResourceMutationMutationRefetch = (
  variables:CreateResourceMutationMutationVariables, 
  context?:any
)=>({
  query:CreateResourceMutationDocument,
  variables,
  context
})
      
