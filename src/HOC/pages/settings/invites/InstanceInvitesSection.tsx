import React, { FC, useMemo } from 'react';
import Invites, { Props } from 'ui/pages/settings/invites';
import { useInstanceRegistrationAllowLists } from 'fe/settings/instance/registration/allowlist/instanceRegistrationAllowLists';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFormikPage } from 'fe/lib/helpers/usePage';

export interface InstanceInvitesSection {}

export const withEmailValidation = Yup.object().shape({
  email: Yup.string().email()
});

export const InstanceInvitesSection: FC<InstanceInvitesSection> = () => {
  const {
    removeEmail,
    addEmail,
    listEmailsPage,
    sendInviteEmail
  } = useInstanceRegistrationAllowLists();
  const [loadMoreEmails] = useFormikPage(listEmailsPage);
  const formikAddEmail = useFormik<{ email: string }>({
    initialValues: { email: '' },
    validationSchema: withEmailValidation,
    onSubmit: ({ email }) => {
      return email ? addEmail(email) : undefined;
    }
  });

  const formikRemoveEmail = useFormik<{ email: string }>({
    initialValues: { email: '' },
    validationSchema: withEmailValidation,
    onSubmit: ({ email }) => {
      const emailId = listEmailsPage.edges.find(_ => email === _.email)?.id;
      return emailId ? removeEmail(emailId) : undefined;
    }
  });

  const formikSendInvite = useFormik<{ email: string }>({
    initialValues: { email: '' },
    validationSchema: withEmailValidation,
    onSubmit: ({ email }) => {
      return sendInviteEmail(email);
    }
  });

  const emailsList: Props['emailsList'] = useMemo(
    () => listEmailsPage.edges.map(_ => _.email),
    [listEmailsPage]
  );

  const props = useMemo<Props>(() => {
    return {
      formikAddEmail,
      formikRemoveEmail,
      formikSendInvite,
      emailsList,
      loadMoreEmails
    };
  }, [formikAddEmail, formikRemoveEmail, emailsList]);
  return <Invites {...props} />;
};
