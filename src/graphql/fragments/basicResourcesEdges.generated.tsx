import * as Types from '../types.generated';

import { BasicResourceFragment } from './basicResource.generated';
import gql from 'graphql-tag';
import { BasicResourceFragmentDoc } from './basicResource.generated';


export type BasicResourcesPageFragment = (
  { __typename: 'ResourcesPage' }
  & Pick<Types.ResourcesPage, 'totalCount'>
  & { pageInfo: (
    { __typename: 'PageInfo' }
    & Pick<Types.PageInfo, 'endCursor' | 'startCursor'>
  ), edges: Array<(
    { __typename: 'Resource' }
    & BasicResourceFragment
  )> }
);

export const BasicResourcesPageFragmentDoc = gql`
    fragment BasicResourcesPage on ResourcesPage {
  totalCount
  pageInfo {
    endCursor
    startCursor
  }
  edges {
    ...BasicResource
  }
}
    ${BasicResourceFragmentDoc}`;
