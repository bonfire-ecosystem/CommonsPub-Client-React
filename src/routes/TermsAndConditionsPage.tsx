import TermsAndConditionsPage from 'ui/pages/termsAndConditions';
import React, { FC } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { GuestTemplate } from 'HOC/templates/Guest/Guest';

interface TermsAndConditionsPageRouter {}
const TermsAndConditionsPageRouter: FC<RouteComponentProps<
  TermsAndConditionsPageRouter
>> = () => {
  return (
    <GuestTemplate withoutHeader>
      <TermsAndConditionsPage />
    </GuestTemplate>
  );
};

export const TermsAndConditionsPageRoute: RouteProps = {
  exact: true,
  path: '/terms',
  component: TermsAndConditionsPageRouter
};
