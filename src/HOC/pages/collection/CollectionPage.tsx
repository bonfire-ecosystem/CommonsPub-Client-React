import { useCollectionOutboxActivities } from 'fe/activities/outbox/collection/useCollectionOutboxActivities';
import { useCollection } from 'fe/collection/useCollection';
import { useFormikPage } from 'fe/lib/helpers/usePage';
import { useCollectionResources } from 'fe/resource/collection/useCollectionResources';
import { useCollectionFollowers } from 'fe/user/followers/collection/useCollectionFollowers';
import { Collection } from 'graphql/types.generated';
import { AddResourceHOC } from 'HOC/modules/AddResource/addResourceHOC';
import { EditCollectionPanelHOC } from 'HOC/modules/EditCollectionPanel/editCollectionPanelHOC';
import { HeroCollection } from 'HOC/modules/HeroCollection/HeroCollection';
import { ActivityPreviewHOC } from 'HOC/modules/previews/activity/ActivityPreview';
import { ResourcePreviewHOC } from 'HOC/modules/previews/resource/ResourcePreview';
import { UserPreviewHOC } from 'HOC/modules/previews/user/UserPreview';
import { ShareLinkHOC } from 'HOC/modules/ShareLink/shareLinkHOC';
import React, { FC, useMemo } from 'react';
import { Box } from 'rebass';
import CollectionPageUI, {
  Props as CollectionPageProps
} from 'ui/pages/collection';

export enum CollectionPageTab {
  Activities,
  Resources,
  Followers
}
export interface CollectionPage {
  collectionId: Collection['id'];
  tab: CollectionPageTab;
  basePath: string;
}

export const CollectionPage: FC<CollectionPage> = props => {
  const { collectionId, basePath /*,tab */ } = props;
  const { collection, isCommunityMember } = useCollection(props.collectionId);
  const { collectionFollowersPage } = useCollectionFollowers(
    props.collectionId
  );
  const [loadMoreFollowers] = useFormikPage(collectionFollowersPage);

  const { resourcesPage } = useCollectionResources(props.collectionId);
  const [loadMoreResources] = useFormikPage(resourcesPage);

  const { activitiesPage } = useCollectionOutboxActivities(props.collectionId);
  const [loadMoreActivities] = useFormikPage(activitiesPage);

  const collectionPageProps = useMemo<CollectionPageProps | null>(() => {
    if (!collection) {
      return null;
    }

    const HeroCollectionBox = (
      <HeroCollection basePath={basePath} collectionId={collectionId} />
    );

    const ActivitiesBox = (
      <>
        {activitiesPage.edges.map(activity => (
          <ActivityPreviewHOC activityId={activity.id} key={activity.id} />
        ))}
      </>
    );

    const ResourcesBox = (
      <>
        {resourcesPage.edges.map(resource => (
          <Box mx={2} my={1}>
            <ResourcePreviewHOC resourceId={resource.id} key={resource.id} />
          </Box>
        ))}
      </>
    );

    const EditCollectionPanel: CollectionPageProps['EditCollectionPanel'] = ({
      done
    }) => <EditCollectionPanelHOC done={done} collectionId={collectionId} />;

    const UploadResourcePanel: CollectionPageProps['UploadResourcePanel'] = ({
      done
    }) => <AddResourceHOC done={done} collectionId={collectionId} />;

    const FollowersBoxes: CollectionPageProps['FollowersBoxes'] = (
      <>
        {collectionFollowersPage.edges.map(
          follow =>
            follow.creator && <UserPreviewHOC userId={follow.creator?.userId} />
        )}
      </>
    );

    const ShareLinkBox: CollectionPageProps['ShareLinkBox'] = ({ done }) => (
      <ShareLinkHOC collectionId={collectionId} done={done} />
    );

    const uiProps: CollectionPageProps = {
      ActivitiesBox,
      ShareLinkBox,
      HeroCollectionBox,
      ResourcesBox,
      EditCollectionPanel,
      UploadResourcePanel,
      basePath,
      FollowersBoxes,
      collectionName: collection.name,
      loadMoreFollowers,
      loadMoreResources,
      loadMoreActivities,
      isCommunityMember
    };
    return uiProps;
  }, [
    props,
    activitiesPage,
    resourcesPage,
    collectionFollowersPage,
    loadMoreFollowers,
    loadMoreResources,
    loadMoreActivities,
    isCommunityMember,
    collection
  ]);
  return collectionPageProps && <CollectionPageUI {...collectionPageProps} />;
};
