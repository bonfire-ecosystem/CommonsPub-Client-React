import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';

export type SettingsPageMeFragment = (
  { __typename: 'Me' }
  & { user: (
    { __typename: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'location' | 'summary' | 'displayUsername' | 'website' | 'extraInfo'>
    & { icon: Types.Maybe<(
      { __typename: 'Content' }
      & Pick<Types.Content, 'id' | 'url'>
    )>, image: Types.Maybe<(
      { __typename: 'Content' }
      & Pick<Types.Content, 'id' | 'url'>
    )> }
  ) }
);

export const SettingsPageMeFragmentDoc = gql`
    fragment SettingsPageMe on Me {
  user {
    id
    name
    icon {
      id
      url
    }
    image {
      id
      url
    }
    location
    summary
    displayUsername
    website
    extraInfo
  }
}
    `;
