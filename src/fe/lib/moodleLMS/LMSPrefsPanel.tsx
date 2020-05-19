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
  sendToLMS(_: LMSPrefs, updatePrefs: boolean): void | Promise<unknown>;
  lmsParams: Maybe<LMSPrefs>;
}
const validationSchema = Yup.object<BasicMoodleLMSConfigFormValues>({
  site: Yup.string()
    .url()
    .required()
});
export const LMSPrefsPanel: FC<LMSPrefsPanel> = ({
  done,
  lmsParams,
  sendToLMS
}) => {
  const sendToMoodleFormik = useFormik<BasicMoodleLMSConfigFormValues>({
    initialValues: lmsParams || { site: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: LMSPrefs => sendToLMS(LMSPrefs, sendToMoodleFormik.dirty)
  });
  const cancel = useCallback(() => done(), [done]);
  return (
    <MoodlePanel cancel={cancel} sendToMoodleFormik={sendToMoodleFormik} />
  );
};
