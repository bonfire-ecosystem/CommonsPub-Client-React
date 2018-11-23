import * as React from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { graphql } from 'react-apollo';

import H1 from '../../components/typography/H1/H1';
import P from '../../components/typography/P/P';
import styled from 'styled-components';
import Logo from '../../components/brand/Logo/Logo';
import Main from '../../components/chrome/Main/Main';
import Community from '../../types/Community';
import { CommunityCard } from '../../components/elements/Card/Card';

const { getCommunitiesQuery } = require('../../graphql/getCommunities.graphql');

const PageTitle = styled(H1)`
  font-size: 30px !important;
  margin-block-start: 0;
  margin-block-end: 0;
`;

interface Props {
  communities: Community[];
}

class CommunitiesYours extends React.Component<Props> {
  render() {
    return (
      <Main>
        <Grid>
          <Row>
            <Col sm={6}>
              <Logo />
              <PageTitle>Your Communities</PageTitle>
            </Col>
          </Row>
          <Row>
            <Col size={6}>
              <P>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ornare pretium tellus ut laoreet. Donec nec pulvinar
                diam. Fusce sed est sed sem condimentum porttitor eget non
                turpis. Sed dictum pulvinar dui, iaculis ultrices orci
                scelerisque non. Integer a dignissim arcu. Nunc eu mi orci.
                Fusce ante sapien, elementum in gravida ut, porta ut erat.
                Suspendisse potenti.
              </P>
            </Col>
          </Row>
          <Row>
            <Col size={10} style={{ display: 'flex', flexWrap: 'wrap' }}>
              {this.props.communities.map(community => {
                return (
                  <CommunityCard key={community.id} community={community} />
                );
              })}
            </Col>
          </Row>
        </Grid>
      </Main>
    );
  }
}

export default graphql(getCommunitiesQuery)(CommunitiesYours);
