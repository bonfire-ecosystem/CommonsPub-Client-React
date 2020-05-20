import * as Types from './types.generated';

import { ActivityPreviewFragment } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import { BasicUserFragment } from './fragments/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './fragments/basicUser.generated';
import { ActivityPreviewFragmentDoc } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



export type GetMeInboxQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Array<Types.Scalars['Cursor']>>
};


export type GetMeInboxQuery = (
  { __typename: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename: 'Me' }
    & { user: (
      { __typename: 'User' }
      & { inbox: Types.Maybe<(
        { __typename: 'ActivitiesPage' }
        & { pageInfo: (
          { __typename: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        ), edges: Array<(
          { __typename: 'Activity' }
          & ActivityPreviewFragment
        )> }
      )> }
      & BasicUserFragment
    ) }
  )> }
);


export const GetMeInboxDocument = gql`
    query getMeInbox($limit: Int, $end: [Cursor!]) {
  me {
    user {
      ...BasicUser
      inbox(limit: $limit, after: $end) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          ...ActivityPreview
        }
      }
    }
  }
}
    ${BasicUserFragmentDoc}
${ActivityPreviewFragmentDoc}`;

/**
 * __useGetMeInboxQuery__
 *
 * To run a query within a React component, call `useGetMeInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeInboxQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetMeInboxQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
      }
export function useGetMeInboxLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
        }
export type GetMeInboxQueryHookResult = ReturnType<typeof useGetMeInboxQuery>;
export type GetMeInboxLazyQueryHookResult = ReturnType<typeof useGetMeInboxLazyQuery>;
export type GetMeInboxQueryResult = ApolloReactCommon.QueryResult<GetMeInboxQuery, GetMeInboxQueryVariables>;


export interface GetMeInboxQueryOperation {
  operationName: 'getMeInbox'
  result: GetMeInboxQuery
  variables: GetMeInboxQueryVariables
  type: 'query'
}
export const GetMeInboxQueryName:GetMeInboxQueryOperation['operationName'] = 'getMeInbox'

export const GetMeInboxQueryRefetch = (
  variables:GetMeInboxQueryVariables, 
  context?:any
)=>({
  query:GetMeInboxDocument,
  variables,
  context
})
      
