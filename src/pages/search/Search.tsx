import * as React from 'react';
import { Box, Flex, Text } from 'rebass/styled-components';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
// import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../wrappers/Wrappers';
import {
  connectInfiniteHits,
  Pagination,
  RefinementList,
  Configure
} from 'react-instantsearch-dom';
import Preview from './preview';
import { Trans } from '@lingui/macro';
// import { LocaleContext } from '../../containers/App/App';
import styled from '../../themes/styled';
import { Nav, Panel, PanelTitle, WrapperPanel } from 'ui/elements/Panel';
import {
  SearchHostIndexAndMyFollowingsQuery,
  useSearchHostIndexAndMyFollowingsQuery
} from './SearchData.generated';
import { Hit } from './Hits';
import Maybe from 'graphql/tsutils/Maybe';
import { mnCtx } from 'fe/lib/graphql/ctx';

const WrapperResult = styled(Box)`
  border-bottom: ${props => props.theme.colors.border};
`;
const SupText = styled(Text)`
  a {
    color: inherit;
    text-decoration: none
   :hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const PagFlex = styled(Flex)`
  align-content: center;
  text-align: center;
  .ais-Pagination {
    flex: 1;
  }
`;

interface Result {
  hit: Hit;
  myInfo: Maybe<SearchHostIndexAndMyFollowingsQuery>;
}
const Result: React.FC<Result> = ({ hit, myInfo }) => {
  return (
    <WrapperResult p={3}>
      {hit.collection ? (
        <SupText mb={3} variant="suptitle">
          <a href={hit.collection.community.canonicalUrl}>
            {hit.collection.community.name}
          </a>{' '}
          > <a href={hit.collection.canonicalUrl}>{hit.collection.name}</a>
        </SupText>
      ) : hit.community ? (
        <SupText mb={3} variant="suptitle">
          <a href={hit.community.canonicalUrl}>{hit.community.name}</a>
        </SupText>
      ) : (
        <span />
      )}
      <Preview hit={hit} myInfo={myInfo} />
    </WrapperResult>
  );
};

const InfiniteHits = ({ hits }: { hits: Hit[] }) => {
  const { data } = useSearchHostIndexAndMyFollowingsQuery({
    context: mnCtx({ noShowError: true })
  });
  // return the DOM output
  return (
    <>
      {hits.map(hit => (
        <Result key={hit.objectID} hit={hit} myInfo={data} />
      ))}
      <PagFlex alignItems="center" p={3}>
        <Pagination showNext />
      </PagFlex>
    </>
  );
};

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);

export default class extends React.Component {
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/reset-min.css"
        />

        <MainContainer>
          <HomeBox>
            <WrapperCont>
              <Wrapper>
                <Configure hitsPerPage={8} />
                <Box>
                  <Text
                    mb={3}
                    sx={{ borderBottom: '1px solid #dadada' }}
                    p={3}
                    variant="suptitle"
                  >
                    <Trans>Search result</Trans>
                  </Text>
                  <Box>
                    <CustomInfiniteHits />
                  </Box>
                </Box>
              </Wrapper>
            </WrapperCont>
          </HomeBox>

          <WrapperPanel>
            <Panel>
              <PanelTitle fontSize={0} fontWeight={'bold'}>
                <Trans>Search filter</Trans>
              </PanelTitle>
              <Nav>
                <RefinementList attribute="index_type" />
              </Nav>
            </Panel>
          </WrapperPanel>
        </MainContainer>
      </>
    );
  }
}
