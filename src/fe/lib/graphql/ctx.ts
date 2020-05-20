import { ExecutionResult, GraphQLError } from 'graphql';
import { toast, ToastContent, ToastOptions } from 'react-toastify';
import { ApolloLink } from 'apollo-link';
import { getOperationNameAndType } from 'util/apollo/operation';
import Maybe from 'graphql/tsutils/Maybe';

export interface APICTX<Data = any> {
  ctx?: string;
  noShowError?: boolean;
  noShowSuccess?: boolean;
  errorMsg?: (errors: readonly GraphQLError[]) => string;
  successMsg?: (data: Data) => string;
}

const defaultErrorMsg = (ctx: string, errors: readonly GraphQLError[]) => {
  const errorMsg = errors.map(_ => _.message).join('\n');
  return `Ooops, something went wrong with ${ctx}: \n${errorMsg}`;
};
const defaultSuccessMsg = (ctx: string) => `${ctx} success`;

export const notifyGqlResponse = <Data>(opts: APICTX<Data> = {}) => (
  resp: ExecutionResult<Data>
) => {
  if (resp.errors && !opts.noShowError) {
    const errorMsg = opts.errorMsg
      ? opts.errorMsg(resp.errors)
      : defaultErrorMsg(opts.ctx || 'this operation', resp.errors);
    notify(errorMsg, { type: 'error' });
  } else if (!resp.errors && resp.data && !opts.noShowSuccess) {
    const successMsg = opts.successMsg
      ? opts.successMsg(resp.data)
      : defaultSuccessMsg(opts.ctx || '');
    notify(successMsg, { type: 'success' });
  }
  return resp;
};

export const notify = (content: ToastContent, options: ToastOptions) =>
  toast(content, options);

const MN_CTX_FLD = 'MN_CTX_FLD';
export const mnCtx = <Data>(opts: APICTX<Data>) => ({ [MN_CTX_FLD]: opts });
export const getMnCtx = <Data>(context: any): undefined | APICTX<Data> =>
  context ? context[MN_CTX_FLD] : undefined;

export const MngErrorLink = new ApolloLink((operation, forward) => {
  const [, opType] = getOperationNameAndType(operation.query);
  const mnCtx = operation.getContext()[MN_CTX_FLD] as Maybe<APICTX>;
  const noShowSuccess =
    opType === 'query' || (!mnCtx?.ctx && !mnCtx?.successMsg);

  return forward(operation).map(
    notifyGqlResponse({
      noShowSuccess,
      ctx: operation.operationName,
      ...operation.getContext()[MN_CTX_FLD]
    })
  );
});
