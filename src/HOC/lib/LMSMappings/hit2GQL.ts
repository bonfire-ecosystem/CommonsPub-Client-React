import { CollectionHit, CommunityHit, ResourceHit } from 'fe/search/Hits';
import Maybe from 'graphql/tsutils/Maybe';
import { CollectionPreviewFragment } from 'HOC/modules/previews/collection/CollectionPreview.generated';
import { CommunityPreviewFragment } from 'HOC/modules/previews/community/CommunityPreview.generated';
import { ResourcePreviewFragment } from 'HOC/modules/previews/resource/ResourcePreview.generated';

export const resourceHit2lms = (
  resource: Maybe<ResourceHit>
): ResourcePreviewFragment | null => {
  const collection = collectionHit2lms(resource?.collection);
  const url = resource?.url;
  if (!(resource && collection && url)) {
    return null;
  }
  const {
    name,
    canonicalUrl,
    icon,
    licence,
    summary,
    // url,
    mediaType,
    // createdAt,
    // index_instance,
    index_mothership_object_id,
    // index_type,
    // objectID,
    // updatedAt,
    // collection,
    likes
  } = resource;
  return {
    __typename: 'Resource',
    canonicalUrl: canonicalUrl || '',
    collection,
    icon: icon ? { __typename: 'Content', id: '', url: icon } : null,
    name,
    summary: summary || '',
    license: licence,
    id: index_mothership_object_id,
    likers: {
      __typename: 'LikesPage',
      totalCount: parseInt(likes?.totalCount || '0') || 0
    },
    myFlag: null,
    myLike: null,
    payload: {
      __typename: 'Content',
      id: '',
      url,
      mirror: { __typename: 'ContentMirror', url },
      mediaType: mediaType || '',
      upload: { __typename: 'ContentUpload' }
    }
  };
};

export const collectionHit2lms = (
  collection: Maybe<CollectionHit>
): CollectionPreviewFragment | null => {
  const community = communityHit2lms(collection?.community);
  if (!(collection && community)) {
    return null;
  }
  const {
    preferredUsername,
    canonicalUrl,
    icon,
    summary,
    // createdAt,
    // index_instance,
    index_mothership_object_id,
    // index_type,
    name
    // objectID,
    // community,
    // followers
  } = collection;
  return {
    __typename: 'Collection',
    community,
    displayUsername: name,
    icon: icon ? { __typename: 'Content', id: '', url: icon } : null,
    id: index_mothership_object_id,
    isLocal: false,
    myFlag: null,
    myFollow: null,
    name,
    canonicalUrl,
    summary,
    preferredUsername
  };
};

export const communityHit2lms = (
  community: Maybe<CommunityHit>
): CommunityPreviewFragment | null => {
  if (!community) {
    return null;
  }
  const {
    name,
    preferredUsername,
    summary,
    canonicalUrl,
    icon,
    // createdAt,
    // index_instance,
    index_mothership_object_id,
    // index_type,
    // objectID,
    followers
    // image
  } = community;
  return {
    __typename: 'Community',
    icon: icon ? { __typename: 'Content', id: '', url: icon } : null,
    id: index_mothership_object_id,
    isLocal: false,
    name,
    canonicalUrl,
    summary,
    followerCount: followers?.totalCount || 0,
    threads: { totalCount: 0, __typename: 'ThreadsPage' },
    displayUsername: name,
    myFlag: null,
    myFollow: null,
    collectionCount: 0,
    preferredUsername,
    creator: null // FIXME: get it from BE
  };
};
