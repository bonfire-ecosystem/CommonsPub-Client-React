import { useProfile } from 'fe/user/profile/useProfile';
import { LMSPrefsPanel } from './LMSPrefsPanel';
import React, { useMemo, useCallback } from 'react';
import { LMSPrefs, sendToMoodle } from './LMSintegration';
import {
  SESSION,
  createLocalSessionKVStorage
} from 'util/keyvaluestore/localSessionStorage';
const storage = createLocalSessionKVStorage(SESSION)('LMS_');
const LMS_KEY = 'LMS';

type MaybeResourceUrl = string | null | undefined;
export const useLMS = (resourceUrl: MaybeResourceUrl) => {
  const { profile, updateProfile } = useProfile();

  const LMSPrefs = profile?.extraInfo?.LMS;

  const updateLMSPrefs = useCallback(
    async (LMS: LMSPrefs) => {
      storage.set(LMS_KEY, LMS);
      if (profile) {
        await updateProfile({ profile: { extraInfo: { LMS } } });
      }
    },
    [updateProfile]
  );

  const updateLMSPrefsAndSend = useCallback(
    async (LMS: LMSPrefs) => {
      if (!resourceUrl) {
        return false;
      }
      updateLMSPrefs(LMS).finally(() => sendToMoodle(resourceUrl, LMS));
      return true;
    },
    [resourceUrl, LMSPrefs]
  );

  return useMemo(
    () => ({
      updateLMSPrefs,
      updateLMSPrefsAndSend,
      LMSPrefsPanel: ({ done }) => (
        <LMSPrefsPanel
          done={done}
          lmsParams={profile?.extraInfo?.LMS || storage.get(LMS_KEY)}
          updateLMSPrefsAndSend={updateLMSPrefsAndSend}
        />
      )
    }),
    [updateLMSPrefsAndSend, updateLMSPrefs]
  );
};
