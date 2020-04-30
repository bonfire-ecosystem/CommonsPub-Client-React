import * as React from 'react';
import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import { FormikHook } from 'ui/@types/types';
import Alert from '../../elements/Alert';
import { Input, Label, Checkbox } from '@rebass/forms';
import Button from 'ui/elements/Button';
import { Box, Text, Flex } from 'rebass/styled-components';
import styled from '../../themes/styled';
import { AlertCircle } from 'react-feather';
import { AlertWrapper } from 'ui/modules/Modal';
import {
  INSTANCE_TAGLINE,
  INVITE_ONLY_TEXT,
  logo_large_url
} from 'mn-constants';
import media from 'styled-media-query';
import { NavLink } from 'react-router-dom';

let tt = {
  login: i18nMark('Sign in'),
  placeholders: {
    email: i18nMark('eg. mary@moodlers.org'),
    preferredUsername: i18nMark('eg. moodlerMary'),
    name: i18nMark('eg. Moodler Mary'),
    password: i18nMark('Choose your password'),
    passwordConfirm: i18nMark('Confirm your password')
  }
};

export interface Props {
  formik: FormikHook<SignUpFormValues>;
  registeredUsername?: string;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  username: string;
  passwordConfirm: string;
  terms: boolean;
}

export const SignUpPage: React.FC<Props> = ({ formik, registeredUsername }) => {
  return (
    <Container>
      {!formik.isSubmitting && formik.submitCount && registeredUsername ? (
        <Box mt={3}>
          <p>
            <Trans>Welcome</Trans> {registeredUsername}
          </p>
          <p>
            <Trans>
              Please confirm your email clicking on the link we sent you at
            </Trans>
          </p>

          <Alert variant="bad">{formik.errors.email}</Alert>
        </Box>
      ) : (
        <LoginWrapper>
          <Header>
            <Logo />
            <Tagline>{INSTANCE_TAGLINE}</Tagline>
            <Aware p={3}>
              <Box mr={2}>
                <AlertCircle size="20" color="white" />
              </Box>
              <Text variant="suptitle">{INVITE_ONLY_TEXT}</Text>
            </Aware>
          </Header>
          <Flex mt={2}>
            <FormWrapper>
              <Box>
                <label>
                  <Trans>Email</Trans>
                </label>
                <Input
                  placeholder={tt.placeholders.email}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <AlertWrapper>
                    <Alert variant="bad">{formik.errors.email}</Alert>
                  </AlertWrapper>
                )}
              </Box>
              <Box mt={3}>
                <label>
                  <Trans>Display Name</Trans>
                </label>
                <Input
                  placeholder={tt.placeholders.name}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <AlertWrapper>
                    <Alert variant="bad">{formik.errors.name}</Alert>
                  </AlertWrapper>
                )}
              </Box>
              <Box mt={3}>
                <label>
                  <Trans>Preferred username</Trans>
                </label>
                <Input
                  placeholder={tt.placeholders.preferredUsername}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                {formik.errors.username && (
                  <AlertWrapper>
                    <Alert variant="bad">{formik.errors.username}</Alert>
                  </AlertWrapper>
                )}
              </Box>
              <Box mt={3}>
                <label>
                  <Trans>Password</Trans>
                </label>
                <Input
                  placeholder={tt.placeholders.password}
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <AlertWrapper>
                    <Alert variant="bad">{formik.errors.password}</Alert>
                  </AlertWrapper>
                )}
              </Box>
              <Box mt={3}>
                <label>
                  <Trans>Confirm password</Trans>
                </label>
                <Input
                  placeholder={tt.placeholders.passwordConfirm}
                  name="passwordConfirm"
                  type="password"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                />
                {formik.errors.passwordConfirm && (
                  <AlertWrapper>
                    <Alert variant="bad">{formik.errors.passwordConfirm}</Alert>
                  </AlertWrapper>
                )}
              </Box>
              <Box mt={3} mb={3}>
                <Label alignItems="center">
                  <Checkbox
                    name="terms"
                    id="remember"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                  />
                  I have read and agreed the{' '}
                  <NavLink to="/terms"> Terms and Conditions </NavLink>
                </Label>
              </Box>
              <Box mt={3}>
                <Button
                  variant="primary"
                  isSubmitting={formik.isSubmitting}
                  isDisabled={formik.isSubmitting}
                  type="submit"
                  onClick={formik.submitForm}
                >
                  <Trans>Signup</Trans>
                </Button>
              </Box>
            </FormWrapper>
            {/* <Right>
              {terms_markdown_urls.enabled && (
                <>
                  <Aware green mt={3} p={3}>
                    <Box mr={2}>
                      <Eye size="20" color="white" />
                    </Box>
                    <Text variant="suptitle">
                      {' '}
                      Please read the following. By signing up your are
                      consenting to these agreements.
                    </Text>
                  </Aware>
                  <WrapperPanel className="extra">
                    <Panel>
                      <Box p={3}>
                        <Markdown>
                          {terms_users.data || terms_users_text.data}
                        </Markdown>
                      </Box>
                      <Box p={3}>
                        <Markdown>
                          {terms_cookies.data || terms_cookies_text.data}
                        </Markdown>
                      </Box>
                      <Box p={3}>
                        <Markdown>
                          {terms_indexing.data || terms_indexing_text.data}
                        </Markdown>
                      </Box>
                    </Panel>
                  </WrapperPanel>
                </>
              )}
            </Right> */}
          </Flex>
          {/* <Footer>
            <ul>
              <li>
                <a href={related_urls.project_homepage} target="blank">
                  About
                </a>
              </li>
              <li>
                <a href={related_urls.terms_users} target="blank">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href={related_urls.code} target="blank">
                  Open source
                </a>
              </li>
              <li>
                <a href={related_urls.feedback} target="blank">
                  Feedback
                </a>
              </li>
              <li>
                <a href={related_urls.terms_cookies} target="blank">
                  Privacy notice
                </a>
              </li>
            </ul>
          </Footer> */}
        </LoginWrapper>
      )}
    </Container>
  );
};
export default SignUpPage;

const Tagline = styled.h5`
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 40px;
  color: #000000a1;
  font-weight: 500;
`;

const Logo = styled.div`
  background: url(${logo_large_url});
  width: 300px;
  display: inline-block;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginWrapper = styled(Box)`
  ${media.lessThan('medium')`
    display: grid;
    grid-template-columns: 1fr;
    padding: 16px
  `};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1020px;
`;

const Header = styled.div`
  grid-area: header;
  text-align: center;
`;

const FormWrapper = styled(Box)`
  margin: 0;
  flex: 1;
  input {
    height: 50px;
    color: inherit;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #dadada;
  }
  background: #fff;
  border-radius: 4px;
  height: inherit;
  border: 1px solid #dddfe2;
  text-align: left;
  height: fit-content;
  padding: 16px;
`;

// const Right = styled(Box)`
//   .extra {
//     width: 100%;
//     margin-right: 0;
//   }
// `;

// const Footer = styled(Box)`
//   border-top: 1px solid ${props => props.theme.colors.lightgray};
//   padding-top: 24px;
//   & ul {
//     list-style-type: none;
//     margin: 0;
//     padding: 0;
//     text-align: center;
//     margin: 0 auto;
//     justify-content: center;
//     align-items: center;
//     display: flex;
//     flex: 1;
//     ${clearFix()}
//     & li {
//       float: left;
//       margin-right: 16px;
//       font-size: 13px;
//       & a {
//         color: rgba(0, 0, 0, 0.45);
//         text-decoration: none;
//         &:hover {
//           text-decoration: underline;
//         }
//       }
//     }
//   }
// `;

const Aware = styled(Flex)<{ green: boolean }>`
  background: ${props => (props.green ? '#546d4f' : props.theme.colors.orange)};
  border-radius: 4px;
  align-items: center;
  div {
    color: white;
  }
`;
