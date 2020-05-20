import { useMemo } from 'react';
import { usePage } from 'fe/lib/helpers/usePage';
import { useInstanceFeaturedCommunitiesQuery } from './instanceFeaturedCommunities.generated';

export const useInstanceFeaturedCommunities = () => {
  const featuredCommunitiesQ = useInstanceFeaturedCommunitiesQuery();
  const featuredCommunitiesPage = usePage(
    featuredCommunitiesQ.data?.instance?.featuredCommunities
  );

  return useMemo(() => {
    return {
      featuredCommunitiesPage
    };
  }, [featuredCommunitiesQ]);
};
