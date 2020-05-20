import Maybe from 'graphql/tsutils/Maybe';

export type WithExtraInfo<
  GQLType extends Maybe<{ extraInfo?: any }>,
  ExtraInfoType
> = GQLType extends undefined | null
  ? GQLType
  : Omit<GQLType, 'extraInfo'> & { extraInfo?: Maybe<ExtraInfoType> };
export const withEncodedExtraInfo = <GQLType extends { extraInfo?: any }>(
  gqlObj: GQLType,
  olderGqlObj: Maybe<GQLType>
): GQLType & { extraInfo?: string } => {
  const newExtraInfo = gqlObj.extraInfo;
  const isSomeNewExtraInfo = !!newExtraInfo;
  if (!isSomeNewExtraInfo) {
    return {
      ...gqlObj,
      extraInfo: void 0
    };
  }

  const olderExtraInfo = olderGqlObj?.extraInfo;
  const mergedExtraInfo = JSON.stringify({
    ...olderExtraInfo,
    ...gqlObj.extraInfo
  });

  return {
    ...gqlObj,
    extraInfo: mergedExtraInfo
  };
};
