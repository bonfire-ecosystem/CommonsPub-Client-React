import { getUrlParamsFromEntryPointForMoodleLMS } from 'fe/lib/moodleLMS/LMSintegration';
import { LMSMoodleSearch } from 'HOC/pages/lmsMoodleSearch/lmsMoodleSearch';
import { WithSidebarTemplate } from 'HOC/templates/WithSidebar/WithSidebar';
import React, { FC, useEffect, useState, useRef } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { RedirectAnonymousToLogin } from './wrappers/RedirectBySession';
import { useProfile } from 'fe/user/profile/useProfile';

interface LMSMoodleSearchRouter {}
const LMSMoodleSearchRouter: FC<RouteComponentProps<LMSMoodleSearchRouter>> = ({
  match
}) => {
  const { loading, profile, updateProfile } = useProfile();
  const { current: params } = useRef(getUrlParamsFromEntryPointForMoodleLMS());
  const [props, setProps] = useState<LMSMoodleSearch>();
  useEffect(() => {
    if (loading) {
      return;
    } else if (!profile) {
      setProps({ needsLogin: true });
    } else if (!params) {
      setProps({ badParams: true });
    } else {
      updateProfile({ profile: { extraInfo: { LMS: params } } }).then(() =>
        setProps({ params })
      );
    }
  }, [profile, updateProfile, params, loading]);
  return (
    <RedirectAnonymousToLogin>
      <WithSidebarTemplate>
        {props && <LMSMoodleSearch {...props} />}
      </WithSidebarTemplate>
    </RedirectAnonymousToLogin>
  );
};

export const LMSMoodleSearchRoute: RouteProps = {
  exact: true,
  path: '/lms/moodle/search',
  component: LMSMoodleSearchRouter
};
