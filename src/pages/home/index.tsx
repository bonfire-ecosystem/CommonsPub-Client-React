// import { Trans } from '@lingui/macro';
// import { useMyFollowedCollections } from 'fe/collection/myFollowed/myFollowedCollections';
// import { useMyFollowedCommunities } from 'fe/community/myFollowed/myFollowedCommunities';
// import { useFormikPage } from 'fe/lib/helpers/usePage';
// import { useMe } from 'fe/session/useMe';
// import {
//   ActivityPreviewHOC
//   /* ActivityPreviewCtx */
// } from 'HOC/modules/previews/activity/ActivityPreview';
// import { CollectionPreviewHOC } from 'HOC/modules/previews/collection/CollectionPreview';
// import { CommunityPreviewHOC } from 'HOC/modules/previews/community/CommunityPreview';
// import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Flex } from 'rebass/styled-components';
// import { LoadMore } from 'ui/modules/Loadmore';
// import styled from 'ui/themes/styled';
// import Empty from '../../components/elements/Empty';
// import Loader from '../../components/elements/Loader/Loader';
// import { my_timeline } from '../../mn-constants';

// import { CreateReplyMutationMutationOperation } from '../../graphql/createReply.generated';
// import { DeleteMutationMutationOperation } from '../../graphql/delete.generated';
// import {
//   useGetMeInboxQuery
//   /* GetMeInboxDocument */
// } from '../../graphql/getMeInbox.generated';
// import { LikeMutationMutationOperation } from '../../graphql/like.generated';
// import { HomeBox, MainContainer } from '../../sections/layoutUtils';
// import {
//   Nav,
//   NavItem,
//   Panel,
//   PanelTitle,
//   WrapperPanel
// } from 'ui/elements/Panel';
// import { useDynamicLinkOpResult } from '../../util/apollo/dynamicLink';
// import { Wrapper, WrapperCont } from '../wrappers/Wrappers';
// export enum HomePageTab {
//   Activities ,
//   MyCommunities,
//   MyCollections
// }

// export interface Props {
//   tab: HomePageTab;
// }

// export const Home: React.FC<Props> = ({ tab }) => {
//   const {
//     data,
//     loading,
//     error,
//     /* fetchMore, */ refetch
//     /* variables */
//   } = useGetMeInboxQuery({
//     variables: {
//       limit: 15
//     }
//   });
//   useEffect(() => {
//     refetch();
//   }, []);
//   useDynamicLinkOpResult<CreateReplyMutationMutationOperation>(
//     'createReplyMutation',
//     () => {
//       refetch();
//     },
//     [refetch]
//   );
//   useDynamicLinkOpResult<LikeMutationMutationOperation>(
//     'likeMutation',
//     () => {
//       refetch();
//     },
//     [refetch]
//   );
//   useDynamicLinkOpResult<DeleteMutationMutationOperation>(
//     'deleteMutation',
//     () => {
//       refetch();
//     },
//     [refetch]
//   );
//   const { me } = useMe();
//   const {
//     myCommunityFollowsPage: myFollowedCommunitiesPage
//   } = useMyFollowedCommunities();
//   const [nextCommunitiesFormik] = useFormikPage(myFollowedCommunitiesPage);
//   const {
//     myCollectionFollowsPage: myFollowedCollectionsPage
//   } = useMyFollowedCollections();
//   const [nextCollectionsFormik] = useFormikPage(myFollowedCollectionsPage);
//   return (
//     <MainContainer>
//       <HomeBox>
//         <WrapperCont>
//           <Wrapper>
//             <Menu basePath="/" />
//             {tab === HomePageTab.Activities && (
//               <>
//                 {/* FIX ME  */}
//                 {error ? (
//                   <Empty>
//                     <Trans>Error loading moodlenet timeline</Trans>
//                   </Empty>
//                 ) : loading ? (
//                   <Loader />
//                 ) : data?.me?.user.inbox?.edges ? (
//                   <div>
//                     {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
//                     data.me.user.inbox!.edges!.map(
//                       userActivityEdge =>
//                         userActivityEdge && (
//                           <ActivityPreviewHOC
//                             activityId={userActivityEdge.id}
//                             key={userActivityEdge.id}
//                           />
//                         )
//                     )}
//                   </div>
//                 ) : null}
//               </>
//             )}
//             {me ? (
//               <>
//                 {tab === HomePageTab.MyCommunities && (
//                   <>
//                     {myFollowedCommunitiesPage.edges.map(
//                       _ =>
//                         _.context.__typename === 'Community' && (
//                           <CommunityPreviewHOC communityId={_.context.id} />
//                         )
//                     )}
//                     {nextCommunitiesFormik && (
//                       <LoadMore LoadMoreFormik={nextCommunitiesFormik} />
//                     )}
//                   </>
//                 )}
//                 {tab === HomePageTab.MyCommunities && (
//                   <>
//                     {myFollowedCollectionsPage.edges.map(
//                       _ =>
//                         _.context.__typename === 'Collection' && (
//                           <CollectionPreviewHOC collectionId={_.context.id} />
//                         )
//                     )}
//                     {nextCollectionsFormik && (
//                       <LoadMore LoadMoreFormik={nextCollectionsFormik} />
//                     )}
//                   </>
//                 )}
//               </>
//             ) : null}
//           </Wrapper>
//         </WrapperCont>
//       </HomeBox>
//       <WrapperPanel>
//         <Panel>
//           <PanelTitle fontSize={0} fontWeight={'bold'}>
//             <Trans>{my_timeline}</Trans>
//           </PanelTitle>
//           <Nav>
//             {me ? (
//               <>
//                 <NavItem mb={4} fontSize={1} fontWeight={'bold'}>
//                   <NavLink to={`/user/${me.user.id}/communities`}>
//                     <Trans>Joined communities</Trans>
//                   </NavLink>
//                 </NavItem>
//                 <NavItem fontSize={1} fontWeight={'bold'}>
//                   <NavLink to={`/user/${me.user.id}/collections`}>
//                     <Trans>Followed collections</Trans>
//                   </NavLink>
//                 </NavItem>
//               </>
//             ) : null}
//           </Nav>
//         </Panel>
//       </WrapperPanel>
//     </MainContainer>
//   );
// };

// export default Home;

// const Menu = ({ basePath }: { basePath: string }) => {
//   const { me } = useMe();
//   return (
//     <MenuWrapper>
//       <NavLink exact to={'/'}>
//         <Trans>My Timeline</Trans>
//       </NavLink>
//       {me ? (
//         <>
//           <NavLink to={`/mycommunities`}>
//             <Trans>Joined communities</Trans>
//           </NavLink>
//           <NavLink to={`/mycollections`}>
//             <Trans>Followed collections</Trans>
//           </NavLink>
//         </>
//       ) : null}
//     </MenuWrapper>
//   );
// };

// const MenuWrapper = styled(Flex)`
//   border-bottom: ${props => props.theme.colors.border};
//   padding: 12px 8px;
//   a {
//     font-weight: 700;
//     text-decoration: none;
//     margin-right: 8px;
//     color: ${props => props.theme.colors.medium};
//     letterspacing: 1px;
//     font-size: 14px;
//     padding: 4px 8px;
//     // white-space: nowrap;
//     &.active {
//       color: #ffffff;
//       background: ${props => props.theme.colors.primary};
//       border-radius: 4px;
//     }
//   }
// `;
