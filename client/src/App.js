import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.

// ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.

// InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.

// createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// Establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  // add "proxy": "http://localhost:3001" to package.json for the relative path here to work
  uri: '/graphql',
});

// Instantiate the Apollo Client instance and create the connection to the api endpoint.
// Instantiate a new cache object using InMemoryCache().
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    // We wrap the entire returning JSX code with <ApolloProvider> because we're passing the client veriable
    // in as the value for the client prop. Everything between the tags will have access to the server's api data through the client
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>

  );
}

export default App;
