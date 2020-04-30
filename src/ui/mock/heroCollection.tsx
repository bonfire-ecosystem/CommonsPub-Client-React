import {
  Props as HeroCollectionProps,
  Status as HeroCollectionStatus
} from 'ui/modules/HeroCollection';
import { ToggleFormik } from './formik';

export const getHeroCollectionProps = (
  isAdmin = false,
  following = true,
  icon = 'https://i0.wp.com/japanese-journey.com/wp-content/uploads/2016/03/spaced-repetition.png',
  name = 'Spaced repetition',
  fullName = 'spaced_repetition@home.moodle.net',
  communityIcon = 'https://i0.wp.com/japanese-journey.com/wp-content/uploads/2016/03/spaced-repetition.png',
  communityName = 'Super community',
  summary = 'Technology such as games and mobile apps can help manage your learning and your forgetting.'
): HeroCollectionProps => {
  return {
    collection: {
      status: HeroCollectionStatus.Loaded,
      isAdmin,
      canModify: true,
      following,
      basePath: '/',
      isFlagged: false,
      icon,
      name,
      fullName,
      communityIcon,
      communityId: '2',
      communityName,
      summary,
      followerCount: 10,
      // contributorCount: 2,
      toggleJoinFormik: ToggleFormik(),
      EditCollectionPanel: ({ done }) => <></>,
      FlagModal: ({ done }) => <></>,
      FeaturedModal: () => <></>
    }
  };
};
