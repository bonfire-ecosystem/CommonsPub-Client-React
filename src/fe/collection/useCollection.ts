import { useFollowContext } from 'fe/context/follow/useFollowContext';
import { useMe } from 'fe/session/useMe';
import { Collection } from 'graphql/types.generated';
import { useMemo } from 'react';
import { useEditCollection } from '../collection/edit/useEditCollection';
import { useCollectionDataQuery } from '../collection/useCollection.generated';

export const useCollection = (collectionId: Collection['id']) => {
  const { me } = useMe();

  const collectionQ = useCollectionDataQuery({ variables: { collectionId } });
  const collection = collectionQ.data?.collection;
  const { toggleFollow: toggleJoin } = useFollowContext(collection);
  const { edit } = useEditCollection(collectionId);
  const canModify =
    !!me?.isInstanceAdmin ||
    (!!me && !!collection?.creator && me.user.id === collection.creator.id);

  return useMemo(() => {
    return {
      collection,
      toggleJoin,
      edit,
      canModify
    };
  }, [collection, toggleJoin, edit, canModify]);
};
