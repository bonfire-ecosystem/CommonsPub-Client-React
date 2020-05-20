import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateCollectionMutationMutationVariables = {
  collection: Types.CollectionUpdateInput,
  collectionId: Types.Scalars['String']
};


export type UpdateCollectionMutationMutation = (
  { __typename: 'RootMutationType' }
  & { updateCollection: Types.Maybe<(
    { __typename: 'Collection' }
    & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'createdAt' | 'updatedAt'>
    & { icon: Types.Maybe<(
      { __typename: 'Content' }
      & Pick<Types.Content, 'id' | 'url'>
    )>, resources: Types.Maybe<(
      { __typename: 'ResourcesPage' }
      & Pick<Types.ResourcesPage, 'totalCount'>
    )> }
  )> }
);


export const UpdateCollectionMutationDocument = gql`
    mutation updateCollectionMutation($collection: CollectionUpdateInput!, $collectionId: String!) {
  updateCollection(collection: $collection, collectionId: $collectionId) {
    id
    canonicalUrl
    preferredUsername
    name
    summary
    icon {
      id
      url
    }
    createdAt
    updatedAt
    resources {
      totalCount
    }
  }
}
    `;
export type UpdateCollectionMutationMutationFn = ApolloReactCommon.MutationFunction<UpdateCollectionMutationMutation, UpdateCollectionMutationMutationVariables>;

/**
 * __useUpdateCollectionMutationMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionMutationMutation, { data, loading, error }] = useUpdateCollectionMutationMutation({
 *   variables: {
 *      collection: // value for 'collection'
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useUpdateCollectionMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCollectionMutationMutation, UpdateCollectionMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCollectionMutationMutation, UpdateCollectionMutationMutationVariables>(UpdateCollectionMutationDocument, baseOptions);
      }
export type UpdateCollectionMutationMutationHookResult = ReturnType<typeof useUpdateCollectionMutationMutation>;
export type UpdateCollectionMutationMutationResult = ApolloReactCommon.MutationResult<UpdateCollectionMutationMutation>;
export type UpdateCollectionMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCollectionMutationMutation, UpdateCollectionMutationMutationVariables>;


export interface UpdateCollectionMutationMutationOperation {
  operationName: 'updateCollectionMutation'
  result: UpdateCollectionMutationMutation
  variables: UpdateCollectionMutationMutationVariables
  type: 'mutation'
}
export const UpdateCollectionMutationMutationName:UpdateCollectionMutationMutationOperation['operationName'] = 'updateCollectionMutation'

export const UpdateCollectionMutationMutationRefetch = (
  variables:UpdateCollectionMutationMutationVariables, 
  context?:any
)=>({
  query:UpdateCollectionMutationDocument,
  variables,
  context
})
      
