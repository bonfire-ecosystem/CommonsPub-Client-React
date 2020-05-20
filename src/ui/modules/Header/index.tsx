import React from 'react';
import styled from 'ui/themes/styled';
// import { Link } from 'react-router-dom';
import { Flex, Text } from 'rebass/styled-components';
// import Avatar from 'ui/elements/Avatar';

export const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <HeaderWrapper>
      <Left>
        <SupText ml={2} variant="suptitle">
          {name}
        </SupText>
      </Left>
    </HeaderWrapper>
  );
};

const Left = styled(Flex)`
  flex: auto;
  align-items: center;
`;

const SupText = styled(Text)`
  color: ${props => props.theme.colors.darker};
  text-transform: capitalize;
`;

const HeaderWrapper = styled(Flex)`
  border-bottom: ${props => props.theme.colors.border};
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: ${props => props.theme.colors.appInverse};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  a {
    display: flex;
    flex: 1;
    text-decoration: none;
  }
`;
