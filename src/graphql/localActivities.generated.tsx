import * as Types from './types.generated';

import { ActivityPreviewFragment } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import gql from 'graphql-tag';
import { ActivityPreviewFragmentDoc } from '../HOC/modules/previews/activity/ActivityPreview.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type LocalActivitiesQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Array<Types.Scalars['Cursor']>>
};


export type LocalActivitiesQuery = (
  { __typename: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename: 'Instance' }
    & { outbox: Types.Maybe<(
      { __typename: 'ActivitiesPage' }
      & { pageInfo: (
        { __typename: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      ), edges: Array<(
        { __typename: 'Activity' }
        & ActivityPreviewFragment
      )> }
    )> }
  )> }
);


export const LocalActivitiesDocument = gql`
    query localActivities($limit: Int, $end: [Cursor!]) {
  instance {
    outbox(limit: $limit, after: $end) {
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
    ${ActivityPreviewFragmentDoc}`;

/**
 * __useLocalActivitiesQuery__
 *
 * To run a query within a React component, call `useLocalActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useLocalActivitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocalActivitiesQuery, LocalActivitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<LocalActivitiesQuery, LocalActivitiesQueryVariables>(LocalActivitiesDocument, baseOptions);
      }
export function useLocalActivitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocalActivitiesQuery, LocalActivitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LocalActivitiesQuery, LocalActivitiesQueryVariables>(LocalActivitiesDocument, baseOptions);
        }
export type LocalActivitiesQueryHookResult = ReturnType<typeof useLocalActivitiesQuery>;
export type LocalActivitiesLazyQueryHookResult = ReturnType<typeof useLocalActivitiesLazyQuery>;
export type LocalActivitiesQueryResult = ApolloReactCommon.QueryResult<LocalActivitiesQuery, LocalActivitiesQueryVariables>;


export interface LocalActivitiesQueryOperation {
  operationName: 'localActivities'
  result: LocalActivitiesQuery
  variables: LocalActivitiesQueryVariables
  type: 'query'
}
export const LocalActivitiesQueryName:LocalActivitiesQueryOperation['operationName'] = 'localActivities'

export const LocalActivitiesQueryRefetch = (
  variables:LocalActivitiesQueryVariables, 
  context?:any
)=>({
  query:LocalActivitiesDocument,
  variables,
  context
})
      
