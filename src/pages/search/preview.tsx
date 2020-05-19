/**
 * The only true button.
 *
 * @visibleName The Best Button Ever 🐙
 * Avatar component.
 * @param children {JSX.Element} children of Avatar
 * @param size {"small"|"large"} size of avatar
 * @param marked {Boolean} whether blue dot should appear on avatar
 * @param className {String} additional class names of avatar
 * @param props {Object} avatar props

 */

import * as React from 'react';

import styled from 'ui/themes/styled';
import { Heading, Box, Flex, Text, Button } from 'rebass/styled-components';
// import { NavLink } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import Avatar from 'ui/elements/Avatar';
import { Hit } from '../../fe/search/Hits';
import { useHit } from './lib';
import { SearchHostIndexAndMyFollowingsQuery } from './SearchData.generated';
import { useLMSHit } from 'fe/lib/moodleLMS/useSendToMoodle';
import Modal from 'ui/modules/Modal';
import Maybe from 'graphql/tsutils/Maybe';

// const PlaceholderImg = require('../../components/elements/Icons/resourcePlaceholder.png');

interface Props {
  hit: Hit;
  myInfo: Maybe<SearchHostIndexAndMyFollowingsQuery>;
}

const Resource: React.FC<Props> = ({ hit, myInfo }) => {
  const props = {
    icon: hit.icon,
    title: hit.name,
    summary: hit.summary,
    url: hit.canonicalUrl || '',
    type: hit.index_type
  };
  const hitCtl = useHit(myInfo, hit);
  const { LMSPrefsPanel } = useLMSHit(
    hit.index_type === 'Resource' ? hit : null
  );
  const [isOpenMoodleModal, setOpenMoodleModal] = React.useState(false);
  return (
    <Wrapper p={3}>
      <WrapperLink target="blank" href={props.url}>
        <Avatar size="m" src={props.icon} />
        <Infos ml={3}>
          <Title>
            {props.title.length > 80
              ? props.title.replace(/^(.{76}[^\s]*).*/, '$1...')
              : props.title}
          </Title>
          <Text variant="text" mt={2} mb={3}>
            {props.summary && props.summary.length > 140
              ? props.summary.replace(/^([\s\S]{140}[^\s]*)[\s\S]*/, '$1...')
              : props.summary}
          </Text>

          <Type variant="suptitle">{props.type}</Type>
        </Infos>
      </WrapperLink>
      {hitCtl.isFollowable && !hitCtl.isFollowing && (
        <Button variant="outline" onClick={hitCtl.follow}>
          {props.type === 'Community' ? (
            <Trans>Join</Trans>
          ) : (
            <Trans>Follow</Trans>
          )}
        </Button>
      )}
      {hitCtl.isFollowing && (
        <Button variant="outline" onClick={hitCtl.unfollow}>
          {props.type === 'Community' ? (
            <Trans>Leave</Trans>
          ) : (
            <Trans>Unfollow</Trans>
          )}
        </Button>
      )}
      {hit.index_type === 'Resource' && (
        <Button variant="outline" onClick={() => setOpenMoodleModal(true)}>
          <Trans>To Moodle</Trans>
        </Button>
      )}
      {isOpenMoodleModal && (
        <Modal closeModal={() => setOpenMoodleModal(false)}>
          <LMSPrefsPanel done={() => setOpenMoodleModal(false)} />
        </Modal>
      )}
    </Wrapper>
  );
};
const Type = styled(Text)`
  margin-top: 8px;
  background: ${props => props.theme.colors.lighter};
  display: inline-block;
  padding: 4px 16px;
  border-radius: 30px;
`;
// const Actions = styled.div`
//   width: 100px;
//   text-align: right;
//   & button {
//     height: 25x;
//     max-width: 80px;
//     min-width: 80px;
//     border-width: 1px !important;
//     line-height: 25px;
//     color: ${props => props.theme.colors.light} svg {
//       color: inherit !important;
//     }
//   }
// `;

const WrapperLink = styled.a`
  display: flex;
  text-decoration: none;
  &:hover {
    text-decoration: none !important;
  }
`;

const Wrapper = styled(Flex)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  background: #fff;
  margin: 16px;
  margin-top: 0;
  border-radius: 6px;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.1);
  // border-bottom: 4px solid ${props => props.theme.colors.lighter};
  &:hover {
    border-radius: 4px;
    background: ${props => props.theme.colors.lighter};
  }
`;

const Infos = styled(Box)`
  flex: 1;
  position: relative;
  div {
    text-decoration: none;
  }
`;
const Title = styled(Heading)`
  color: ${props => props.theme.colors.mediumdark};
  font-size: 20px;
  text-decoration: none;
`;

export default Resource;
