import { useFormik } from 'formik';
import React, { FC, useCallback } from 'react';
import {
  BasicMoodleLMSConfigFormValues,
  MoodlePanel
} from 'ui/modules/MoodlePanel';
import * as Yup from 'yup';
import { LMSPrefs } from './LMSintegration';
import Maybe from 'graphql/tsutils/Maybe';

export interface LMSPrefsPanel {
  done(): unknown;
  updateLMSPrefsAndSend(_: LMSPrefs): unknown;
  lmsParams: Maybe<LMSPrefs>;
  resourceurl?: string;
}
const validationSchema = Yup.object<BasicMoodleLMSConfigFormValues>({
  site: Yup.string().url()
});
export const LMSPrefsPanel: FC<LMSPrefsPanel> = ({
  done,
  lmsParams,
  updateLMSPrefsAndSend
}) => {
  const sendToMoodleFormik = useFormik<BasicMoodleLMSConfigFormValues>({
    initialValues: lmsParams || { site: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async LMSPrefs => {
      if (sendToMoodleFormik.dirty) {
        updateLMSPrefsAndSend(LMSPrefs);
      }
      done();
    }
  });
  const cancel = useCallback(() => done(), [done]);
  return (
    <MoodlePanel cancel={cancel} sendToMoodleFormik={sendToMoodleFormik} />
  );
};
