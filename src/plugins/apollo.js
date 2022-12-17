import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {createApolloProvider} from "@vue/apollo-option";
import {concat} from "@apollo/client/link/core";
import store from "@/store";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: store.state.accessToken ? `Bearer ${store.state.accessToken}` : null
    }
  });
  return forward(operation);
});

const authRefreshMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: store.state.refreshToken ? `Bearer ${store.state.refreshToken}` : null
    }
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_API_URL || "http://localhost:3000/graphql",
});

export const apolloProvider = createApolloProvider({
  defaultClient: new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
});

export const apolloRefreshProvider = createApolloProvider({
  defaultClient: new ApolloClient({
    link: concat(authRefreshMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
});