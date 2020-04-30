import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import { i18nMark } from '@lingui/react';
import {
  defaultDataIdFromObject,
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, FetchResult, Observable } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
// import { createHttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import {
  AnonConfirmEmailMutationName,
  AnonLoginMutationName,
  AnonResetPasswordMutationName,
  AnonResetPasswordRequestMutationName,
  AnonSignUpMutationName
} from 'fe/session/anon.generated';
import { MeLogoutMutationName } from 'fe/session/me.generated';
import { Socket as PhoenixSocket } from 'phoenix';
import { logout } from 'redux/session';
import { RootMutationType, RootQueryType } from '../graphql/types.generated';
import {
  GRAPHQL_ENDPOINT,
  IS_DEV,
  PHOENIX_SOCKET_ENDPOINT
} from '../mn-constants';
import { getOpType } from '../util/apollo/operation';
import { KVStore } from '../util/keyvaluestore/types';
import { createUploadLink } from './uploadLink.js';
const introspectionQueryResultData = require('../fragmentTypes.json');

export type MutationName = keyof RootMutationType;
export type QueryName = keyof RootQueryType;
export type OperationName = QueryName | MutationName;

// const { meQuery } = require('../../../graphql/me.graphql');
interface Cfg {
  localKVStore: KVStore;
  appLink: ApolloLink;
  dispatch(payload: any);
}

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export default async function initialise({
  localKVStore,
  appLink,
  dispatch
}: Cfg) {
  let authToken = localKVStore.get(AUTH_TOKEN_KEY);
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({
    fragmentMatcher,
    cacheRedirects: {
      Query: {
        activity: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Activity', id: args.activityId }),
        collection: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Collection', id: args.collectionId }),
        community: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Community', id: args.communityId }),
        comment: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Comment', id: args.commentId }),
        user: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'User', id: args.userId }),
        thread: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Thread', id: args.threadId }),
        resource: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Resource', id: args.resourceId })
      }
    },
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        case 'User': {
          //@ts-ignore
          const id: string = 'userId' in obj ? obj.userId : obj.id;
          return id;
        }
        //   case 'Me': return (obj as Me).email
        default:
          return defaultDataIdFromObject(obj); // fall back to default handling
      }
    }
  });

  const setToken = (token?: string | null | undefined) => {
    if (!token) {
      delToken();
    } else {
      authToken = token;
      localKVStore.set(AUTH_TOKEN_KEY, token);
    }
  };

  const delToken = () => {
    authToken = undefined;
    localKVStore.del(AUTH_TOKEN_KEY);
    dispatch(logout.create());
  };

  const setTokenLink = new ApolloLink((operation, nextLink) => {
    const { operationName } = operation;

    if (operationName === MeLogoutMutationName) {
      delToken();
    }

    return nextLink(operation).map(resp => {
      if (
        operationName === AnonLoginMutationName ||
        operationName === AnonResetPasswordMutationName ||
        operationName === AnonConfirmEmailMutationName
      ) {
        setToken(
          resp?.data?.createSession?.token ||
            resp?.data?.confirmEmail?.token ||
            resp.data?.resetPassword?.token
        );
      }
      return resp;
    });
  });

  /**
   * This context link is used to assign the necessary Authorization header
   * to all HTTP requests to the GraphQL backend. In the case that the user
   * is authenticated it sets their access token as the value, otherwise null.
   */
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : null
      }
    };
  });

  function handleError(message) {
    //  alert(message); //TODO: nicer display of errors
  }

  function handleErrorGraphQL(message, locations, path) {
    console.log(
      `! GraphQL error: Message: ${message}, Path: ${path}, Locations: `,
      locations
    );

    if (!message.includes('You need to log in first')) {
      // don't display this error - we redirect to login screen instead
      handleError(message);
    }
  }

  const errorLink = onError(
    ({ operation, response, graphQLErrors, networkError }) => {
      console.log('errorLink', {
        operation,
        response,
        graphQLErrors,
        networkError
      });
      const needs_login = !!response?.errors?.find(
        (error: any) => error.code === 'needs_login'
      );
      if (needs_login) {
        delToken();
      }
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          handleErrorGraphQL(message, locations, path)
        );
      }

      if (networkError) {
        console.log(`! Network error: ${networkError}`);
        handleError(networkError);
      }
    }
  );

  const clientAwarenessHeadersLinkForNonApollo3Server = setContext((_, ctx) => {
    const { headers } = ctx;
    return {
      ...ctx,
      clientAwareness: undefined,
      headers: {
        ...headers
      }
    };
  });

  const ALLOWED_ANONYMOUS_MUTATIONS = [
    AnonSignUpMutationName,
    AnonLoginMutationName,
    AnonConfirmEmailMutationName,
    AnonResetPasswordMutationName,
    AnonResetPasswordRequestMutationName
  ];
  const alertBlockMutationsForAnonymousLink = new ApolloLink(
    (operation, nextLink) => {
      if (!authToken) {
        const optype = getOpType(operation);
        if (
          optype === 'mutation' &&
          //@ts-ignore
          !ALLOWED_ANONYMOUS_MUTATIONS.includes(operation.operationName)
        ) {
          alert(i18nMark('You should log in for performing this operation!'));

          return Observable.of<FetchResult>({
            errors: [
              {
                message: 'You should log in for performing this operation!',
                //@ts-ignore
                code: 'needs_login'
              }
            ]
          });
        }
      }

      return nextLink(operation);
    }
  );
  // used for graphql query and mutations
  const httpLink = ApolloLink.from(
    [
      IS_DEV ? apolloLogger : null,
      alertBlockMutationsForAnonymousLink,
      errorLink,
      authLink,
      clientAwarenessHeadersLinkForNonApollo3Server,
      setTokenLink,
      appLink,
      createUploadLink({ uri: GRAPHQL_ENDPOINT!! })
    ].filter(Boolean)
  );

  // used for graphql subscriptions
  const absintheSocket = createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(PHOENIX_SOCKET_ENDPOINT))
  );
  // if the operation is a subscription then use
  // the absintheSocket otherwise use the httpLink
  const link = ApolloLink.split(
    operation => hasSubscription(operation.query),
    absintheSocket,
    httpLink
  );

  const client = new ApolloClient({
    cache,
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  });
  return {
    client
  };
}
