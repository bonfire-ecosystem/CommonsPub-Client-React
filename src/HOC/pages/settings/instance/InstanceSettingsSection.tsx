import React, { FC, useMemo } from 'react';
import Instance, { Props } from 'ui/pages/settings/instance';
import { useInstanceRegistrationAllowLists } from 'fe/settings/instance/registration/allowlist/instanceRegistrationAllowLists';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFormikPage } from 'fe/lib/helpers/usePage';

export const withEmailDomainValidation = Yup.object().shape({
  domain: Yup.string().matches(
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/gim
  )
});

export interface InstanceSettingsSection {}

export const InstanceSettingsSection: FC<InstanceSettingsSection> = () => {
  const {
    removeEmailDomain,
    addEmailDomain,
    listEmailDomainsPage
  } = useInstanceRegistrationAllowLists();
  const [loadMoreDomains] = useFormikPage(listEmailDomainsPage);
  const formikAddDomain = useFormik<{ domain: string }>({
    initialValues: { domain: '' },
    validationSchema: withEmailDomainValidation,
    onSubmit: ({ domain }) => {
      return domain ? addEmailDomain(domain) : undefined;
    }
  });
  const formikRemoveDomain = useFormik<{ domain: string }>({
    initialValues: { domain: '' },
    validationSchema: withEmailDomainValidation,
    onSubmit: async ({ domain }) => {
      const domainId = listEmailDomainsPage.edges.find(_ => domain === _.domain)
        ?.id;
      await (domainId ? removeEmailDomain(domainId) : undefined);
      formikRemoveDomain.setValues({ domain: '' });
    }
  });

  const domainsList: Props['domainsList'] = useMemo(
    () => listEmailDomainsPage.edges.map(_ => _.domain),
    [listEmailDomainsPage]
  );

  const props = useMemo<Props>(() => {
    return {
      formikAddDomain,
      formikRemoveDomain,
      domainsList,
      loadMoreDomains
    };
  }, [formikAddDomain, formikRemoveDomain, domainsList]);
  return <Instance {...props} />;
};
