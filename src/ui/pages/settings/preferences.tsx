import * as React from 'react';
import Button from 'ui/elements/Button';
import { ContainerForm, Row, Actions } from 'ui/modules/Modal';
import { Trans } from '@lingui/macro';
import { Box, Text } from 'rebass/styled-components';
// import { ArrowLeft, ArrowRight } from 'react-feather';
// import media from 'styled-media-query';
import styled from '../../themes/styled';
import { LocaleContext } from '../../../context/global/localizationCtx';
import Select from 'react-select';
import { ActionContext } from '../../../context/global/actionCtx';
import { setLang } from '../../../redux/localization';
import { languages, locales } from '../../../mn-constants';
import { FormikHook } from 'ui/@types/types';
import { Label, Input } from '@rebass/forms';
import {APP_NAME, related_urls} from 'mn-constants'

// const Header = styled(Flex)`
//   border-bottom: ${props => props.theme.colors.border};
//   svg {
//     cursor: pointer;
//   }
//   ${media.greaterThan('1005px')`
// display: none;
// `};
// `;

// const TabHeading = styled(Heading)`
//   margin-left: 8px;
//   .--rtl & {
//     margin-right: 8px;
//     margin-left: 0px;
//   }
// `;

export interface EditPreferences {
  moodleWebsite: string;
}

export interface Props {
  formik: FormikHook<EditPreferences>;
}

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
const Preferences: React.FC<Props> = props => (
  <LocaleContext.Consumer>
    {value => (
      <Box>
        <Row>
          <ContainerForm>
            <label>
              <Trans>Select language</Trans>
            </label>
            <LanguageSelect />
            <Box width={1 / 2} mt={2}>
              <Label htmlFor="moodleWebsite">Moodle LMS site location</Label>
              <Input
                id="moodleWebsite"
                disabled={props.formik.isSubmitting}
                value={props.formik.values.moodleWebsite}
                onChange={props.formik.handleChange}
                name="moodleWebsite"
                placeholder={'Type your Moodle LMS instance'}
              />
            </Box>
            <Actions sx={{ height: 'inherit !important' }}>
              <Button
                variant="primary"
                isSubmitting={props.formik.isSubmitting}
                isDisabled={props.formik.isSubmitting}
                type="submit"
                style={{ marginLeft: '10px' }}
                onClick={props.formik.submitForm}
              >
                <Trans>Save</Trans>
              </Button>
            </Actions>
          </ContainerForm>
        </Row>
        <TransifexLink variant="text" my={3} mt={2}>
          <a
            href={related_urls.localisation}
            target="_blank"
          >
            <Trans>Want to contibute to {APP_NAME} translation?</Trans>
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
    color: ${props => props.theme.colors.dark};
    &:hover {
      color: ${props => props.theme.colors.darkest};
    }
  }
`;
