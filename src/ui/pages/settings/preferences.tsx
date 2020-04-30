import * as React from 'react';
import { ContainerForm, Row } from 'ui/modules/Modal';
import { Trans } from '@lingui/macro';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { ArrowLeft, ArrowRight } from 'react-feather';
import media from 'styled-media-query';
import styled from '../../themes/styled';
import { LocaleContext } from '../../../context/global/localizationCtx';
import Select from 'react-select';
import { ActionContext } from '../../../context/global/actionCtx';
import { setLang } from '../../../redux/localization';
import { languages, locales } from '../../../mn-constants';

const Header = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  svg {
    cursor: pointer;
  }
  ${media.greaterThan('1005px')`
display: none;
`};
`;

const TabHeading = styled(Heading)`
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
`;

type LanguageSelectProps = {
  fullWidth?: boolean;
} & React.SelectHTMLAttributes<object>;

const options = locales.map(loc => ({
  value: loc,
  label: languages[loc]
}));

export const LanguageSelect: React.FC<LanguageSelectProps> = props => {
  const { locale } = React.useContext(LocaleContext);
  const { dispatch } = React.useContext(ActionContext);
  return (
    <Select
      options={options}
      defaultValue={options.find(_ => _.value === locale)}
      onChange={selectedKey => {
        const selection =
          !!selectedKey && 'length' in selectedKey
            ? selectedKey[0]
            : selectedKey;
        if (!selection) {
          return;
        }

        dispatch(setLang.create(selection.value));
      }}
    />
  );
};

const Preferences = props => (
  <LocaleContext.Consumer>
    {value => (
      <Box>
        <Header p={3} alignItems="center">
          {value.locale != 'ar_SA' ? (
            <ArrowLeft
              size={32}
              color="#f98012"
              onClick={() => props.onSwitch('sidebar')}
            />
          ) : (
            <ArrowRight
              size={32}
              color="#f98012"
              onClick={() => props.onSwitch('sidebar')}
            />
          )}
          <TabHeading>
            <Trans>Preferences</Trans>
          </TabHeading>
        </Header>
        <Row>
          <ContainerForm>
            <label>
              <Trans>Select language</Trans>
            </label>
            <LanguageSelect />
          </ContainerForm>
        </Row>
        <TransifexLink variant="text" my={3} mt={2}>
          <a
            href="https://www.transifex.com/moodlenet/moodlenet/"
            target="_blank"
          >
            <Trans>Want to contibute to MoodleNet translation?</Trans>
          </a>
        </TransifexLink>
      </Box>
    )}
  </LocaleContext.Consumer>
);

export default Preferences;

const TransifexLink = styled(Text)`
  text-align: right;
  padding: 0px 20px;

  a {
    font-size: 12px;
    text-decoration: underline;
    color: ${props => props.theme.colors.gray};
    &:hover {
      color: ${props => props.theme.colors.darkgray};
    }
  }
`;
