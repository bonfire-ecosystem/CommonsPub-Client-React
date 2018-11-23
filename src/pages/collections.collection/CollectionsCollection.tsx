// import * as React from 'react';
// import { Grid, Row, Col } from '@zendeskgarden/react-grid';
//
// import styled from '../../themes/styled';
// import Link from '../../components/elements/Link/Link';
// import Logo from '../../components/brand/Logo/Logo';
// import slugify from '../../util/slugify';
// import Main from '../../components/chrome/Main/Main';
// import P from '../../components/typography/P/P';
// import Avatar from '../../components/elements/Avatar/Avatar';
// import { Tabs, TabPanel } from '../../components/chrome/Tabs/Tabs';
// import {
//   CollectionCard,
//   ResourceCard
// } from '../../components/elements/Card/Card';
//
// const Contributors = styled.div`
//   margin: 20px 0;
// `;
//
// enum TabsEnum {
//   Resources = 'Resources',
//   Discussion = 'Discussion'
// }
//
// export default class CommunitiesFeatured extends React.Component {
//   state = {
//     tab: TabsEnum.Resources
//   };
//
//   render() {
//     return (
//       <>
//         <Main>
//           <Grid>
//             <Row>
//               <Col sm={6}>
//                 <Logo />
//               </Col>
//             </Row>
//             <Row>
//               <Col size={6}>
//                 Collection by{' '}
//                 <Link to={`/communities/${slugify(card.community.title)}`}>
//                   {card.community.title}
//                 </Link>
//                 {' > '}
//                 <span>{card.title}</span>
//               </Col>
//             </Row>
//             <Row>
//               <Col size={6}>
//                 <div
//                   style={{
//                     marginTop: '1em',
//                     display: 'flex',
//                     flexDirection: 'row'
//                   }}
//                 >
//                   <CollectionCard large {...card} />
//                   <div>
//                     {/*TODO use correct header typography component*/}
//                     <h3>{card.title}</h3>
//                     <P>{card.description}</P>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             <Row>
//               <Col size={6}>
//                 <h3>Contributors</h3>
//                 <Contributors>
//                   {card.contributors.map((c, i) => {
//                     return (
//                       <Avatar key={i} marked={c.id === card.creatorId}>
//                         <img src={c.avatarImage} alt={c.name} />
//                       </Avatar>
//                     );
//                   })}
//                 </Contributors>
//               </Col>
//             </Row>
//             <Row>
//               <Col size={12}>
//                 <Tabs
//                   selectedKey={this.state.tab}
//                   onChange={tab => this.setState({ tab })}
//                 >
//                   <TabPanel label={TabsEnum.Resources} key={TabsEnum.Resources}>
//                     <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                       {DUMMY_RESOURCES.map(card => {
//                         return <ResourceCard key={card.id} {...card} />;
//                       })}
//                     </div>
//                   </TabPanel>
//                   <TabPanel
//                     label={TabsEnum.Discussion}
//                     key={TabsEnum.Discussion}
//                   >
//                     discussions
//                   </TabPanel>
//                 </Tabs>
//               </Col>
//             </Row>
//           </Grid>
//         </Main>
//       </>
//     );
//   }
// }
