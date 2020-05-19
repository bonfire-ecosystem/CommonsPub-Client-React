import * as Types from './types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateProfileMutationMutationVariables = {
  profile: Types.UpdateProfileInput
};


export type UpdateProfileMutationMutation = (
  { __typename: 'RootMutationType' }
  & { updateProfile: Types.Maybe<(
    { __typename: 'Me' }
    & Pick<Types.Me, 'wantsEmailDigest' | 'wantsNotifications'>
    & { user: (
      { __typename: 'User' }
      & Pick<Types.User, 'id' | 'name' | 'summary' | 'location' | 'website'>
      & { icon: Types.Maybe<(
        { __typename: 'Content' }
        & Pick<Types.Content, 'id' | 'url'>
      )>, image: Types.Maybe<(
        { __typename: 'Content' }
        & Pick<Types.Content, 'id' | 'url'>
      )> }
    ) }
  )> }
);


export const UpdateProfileMutationDocument = gql`
    mutation updateProfileMutation($profile: UpdateProfileInput!) {
  updateProfile(profile: $profile) {
    wantsEmailDigest
    wantsNotifications
    user {
      id
      name
      summary
      icon {
        id
        url
      }
      image {
        id
        url
      }
      location
      website
    }
  }
}
    `;
export type UpdateProfileMutationMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>;

/**
 * __useUpdateProfileMutationMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutationMutation, { data, loading, error }] = useUpdateProfileMutationMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useUpdateProfileMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>(UpdateProfileMutationDocument, baseOptions);
      }
export type UpdateProfileMutationMutationHookResult = ReturnType<typeof useUpdateProfileMutationMutation>;
export type UpdateProfileMutationMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutationMutation>;
export type UpdateProfileMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutationMutation, UpdateProfileMutationMutationVariables>;


export interface UpdateProfileMutationMutationOperation {
  operationName: 'updateProfileMutation'
  result: UpdateProfileMutationMutation
  variables: UpdateProfileMutationMutationVariables
  type: 'mutation'
}
export const UpdateProfileMutationMutationName:UpdateProfileMutationMutationOperation['operationName'] = 'updateProfileMutation'

export const UpdateProfileMutationMutationRefetch = (
  variables:UpdateProfileMutationMutationVariables, 
  context?:any
)=>({
  query:UpdateProfileMutationDocument,
  variables,
  context
})
      
