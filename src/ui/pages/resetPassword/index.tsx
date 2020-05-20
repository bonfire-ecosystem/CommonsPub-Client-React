import * as React from 'react';
import { Trans } from '@lingui/macro';
import styled from 'ui/themes/styled';
import Button from 'ui/elements/Button';
import { Input } from '@rebass/forms';
import { FormikHook } from 'ui/@types/types';
import Alert from 'ui/elements/Alert';
import { AlertWrapper } from 'ui/modules/Modal';
import { i18nMark } from '@lingui/react';
import LogoContainer from 'ui/elements/Logo';

export interface ResetPasswordFormValues {
  email: string;
}

export interface Props {
  formik: FormikHook<ResetPasswordFormValues>;
}

let tt = {
  placeholders: {
    email: i18nMark('Enter your email')
  }
};

export const ResetPassword: React.FC<Props> = ({ formik }) => {
  return (
    <>
      <Container>
        <LoginWrapper>
          <FormWrapper>
            <LogoContainer />
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
            <Button
              variant="primary"
              isSubmitting={formik.isSubmitting}
              isDisabled={formik.isSubmitting}
              type="submit"
              onClick={formik.submitForm}
            >
              <Trans>Reset the password</Trans>
            </Button>
          </FormWrapper>
        </LoginWrapper>
      </Container>
    </>
  );
};

export default ResetPassword;

const LoginWrapper = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 1fr;
  grid-template-areas: 'form';
  input {
    height: 50px;
    color: inherit;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #dadada;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  margin-top: 60px;
  padding: 16px;
  padding-bottom: 50px;
  & button {
    margin-top: 16px;
    width: 100%;
    color: #fff !important;
    text-transform: uppercase
      &:hover {
      background: #d67218 !important;
    }
  }
`;

const FormWrapper = styled.div`
  grid-area: form;
  width: 432px;
`;
