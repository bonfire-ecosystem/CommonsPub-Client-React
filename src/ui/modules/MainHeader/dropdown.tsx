import * as React from 'react';
import { Settings, User, Power, Users } from 'react-feather';
import styled from '../../themes/styled';
import { Trans } from '@lingui/macro';
import { useHistory } from 'react-router';
import { Text, Flex } from 'rebass/styled-components';
import { Dropdown } from '../Dropdown';

const List = styled.div<{ lined?: boolean }>`
  padding: 8px;
  border-bottom: ${props => (props.lined ? '1px solid #dadada' : null)};
`;
const Item = styled(Flex)`
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  align-items: center;
  & span {
    display: inline-block;
    margin-right: 8px;
    .--rtl & {
      margin-right: 0px;
      margin-left: 8px;
    }
    & svg {
      vertical-align: sub;
    }
  }
  & a {
    color: inherit !important;
    text-decoration: none;
  }
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export interface Props {
  logout(): void;
  setOpenDropdown: any;
  userLink: string;
  createCommunity: any;
}

export const DropdownSidebar: React.FC<Props> = ({
  logout,
  userLink,
  setOpenDropdown,
  createCommunity
}) => {
  const { push } = useHistory();
  return (
    <Dropdown orientation={'top'} cb={setOpenDropdown}>
      <List lined>
        <Item variant="link" onClick={() => push(userLink)}>
          <span>
            <User size={18} color={'#333'} />
          </span>
          <Text>
            <Trans>Profile</Trans>
          </Text>
        </Item>
        <Item variant="link" onClick={() => push('/settings')}>
          <span>
            <Settings size={18} color={'#333'} />
          </span>
          <Text>
            <Trans>Settings</Trans>
          </Text>
        </Item>
      </List>
      <List lined>
        <Item variant="link" onClick={() => createCommunity()}>
          <span>
            <Users size={18} color={'#333'} />
          </span>
          <Text>
            <Trans>New Community</Trans>
          </Text>
        </Item>
      </List>
      <List lined>
        <Item variant="link">
          <a href="/terms" target="_blank">
            <Trans>Code of Conduct</Trans>
          </a>
        </Item>
        <Text
          style={{
            fontWeight: 600,
            fontSize: '15px',
            padding: '8px',
            paddingLeft: '4px',
            color: '#3c3c3c'
          }}
        >
          v1.0 beta
        </Text>
      </List>
      <List>
        <Item variant="link" onClick={logout}>
          <span>
            <Power width={18} height={18} strokeWidth={1} color={'#333'} />
          </span>
          <Trans>Sign out</Trans>
        </Item>
      </List>
    </Dropdown>
  );
};
