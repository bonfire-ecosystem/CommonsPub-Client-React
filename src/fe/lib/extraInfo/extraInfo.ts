import Maybe from 'graphql/tsutils/Maybe';

export type WithExtraInfo<T extends Maybe<{ extraInfo?: any }>, E> = T extends
  | undefined
  | null
  ? T
  : Omit<T, 'extraInfo'> & { extraInfo?: Maybe<E> };
export const withEncodedExtraInfo = <T extends { extraInfo?: any }>(
  obj: T,
  old: Maybe<T>
): T & { extraInfo?: string } => {
  const extraInfo =
    obj.extraInfo === void 0
      ? old?.extraInfo
      : obj.extraInfo === null
      ? null
      : JSON.stringify({ ...old?.extraInfo, ...obj.extraInfo });

  return {
    ...obj,
    extraInfo
  };
};
