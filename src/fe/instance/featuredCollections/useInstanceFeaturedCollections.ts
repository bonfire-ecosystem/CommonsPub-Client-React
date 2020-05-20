import { useMemo } from 'react';
import { usePage } from 'fe/lib/helpers/usePage';
import { useInstanceFeaturedCollectionsQuery } from './instanceFeaturedCollections.generated';

export const useInstanceFeaturedCollections = () => {
  const featuredCollectionsQ = useInstanceFeaturedCollectionsQuery();
  const featuredCollectionsPage = usePage(
    featuredCollectionsQ.data?.instance?.featuredCollections
  );

  return useMemo(() => {
    return {
      featuredCollectionsPage
    };
  }, [featuredCollectionsQ]);
};
