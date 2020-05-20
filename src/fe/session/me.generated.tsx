import * as Types from '../../graphql/types.generated';

import { SidebarMeUserFragment } from '../../HOC/modules/Sidebar/Sidebar.generated';
import gql from 'graphql-tag';
import { SidebarMeUserFragmentDoc } from '../../HOC/modules/Sidebar/Sidebar.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type MeQueryVariables = {};


export type MeQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & UseMeDataFragment
  )> }
);

export type MeLogoutMutationVariables = {};


export type MeLogoutMutation = (
  { __typename: 'RootMutationType' }
  & Pick<Types.RootMutationType, 'deleteSession'>
);

export type UseMeDataFragment = (
  { __typename: 'Me' }
  & Pick<Types.Me, 'isInstanceAdmin' | 'email' | 'isConfirmed' | 'wantsEmailDigest' | 'wantsNotifications'>
  & { user: (
    { __typename: 'User' }
    & Pick<Types.User, 'id' | 'extraInfo'>
    & SidebarMeUserFragment
  ) }
);

export const UseMeDataFragmentDoc = gql`
    fragment UseMeData on Me {
  isInstanceAdmin
  email
  isConfirmed
  wantsEmailDigest
  wantsNotifications
  user {
    id
    ...SidebarMeUser
    extraInfo
  }
}
    ${SidebarMeUserFragmentDoc}`;
export const MeDocument = gql`
    query me {
  me {
    ...UseMeData
  }
}
    ${UseMeDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MeLogoutDocument = gql`
    mutation meLogout {
  deleteSession
}
    `;
export type MeLogoutMutationFn = ApolloReactCommon.MutationFunction<MeLogoutMutation, MeLogoutMutationVariables>;

/**
 * __useMeLogoutMutation__
 *
 * To run a mutation, you first call `useMeLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMeLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [meLogoutMutation, { data, loading, error }] = useMeLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useMeLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MeLogoutMutation, MeLogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<MeLogoutMutation, MeLogoutMutationVariables>(MeLogoutDocument, baseOptions);
      }
export type MeLogoutMutationHookResult = ReturnType<typeof useMeLogoutMutation>;
export type MeLogoutMutationResult = ApolloReactCommon.MutationResult<MeLogoutMutation>;
export type MeLogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<MeLogoutMutation, MeLogoutMutationVariables>;


export interface MeQueryOperation {
  operationName: 'me'
  result: MeQuery
  variables: MeQueryVariables
  type: 'query'
}
export const MeQueryName:MeQueryOperation['operationName'] = 'me'

export const MeQueryRefetch = (
  variables:MeQueryVariables, 
  context?:any
)=>({
  query:MeDocument,
  variables,
  context
})
      


export interface MeLogoutMutationOperation {
  operationName: 'meLogout'
  result: MeLogoutMutation
  variables: MeLogoutMutationVariables
  type: 'mutation'
}
export const MeLogoutMutationName:MeLogoutMutationOperation['operationName'] = 'meLogout'

export const MeLogoutMutationRefetch = (
  variables:MeLogoutMutationVariables, 
  context?:any
)=>({
  query:MeLogoutDocument,
  variables,
  context
})
      
