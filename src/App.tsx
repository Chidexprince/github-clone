import './App.css';
import React, { Component } from 'react';
import Login from './components/login';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import resultPage from './components/result-page';
import Header from './components/tags/header';
import LandingPage from './components/landing-page';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getRepositories, getUsers } from './components/constant/graphql-query';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});




require('dotenv').config();

class App extends Component {

  render() {

    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={LandingPage} />
        <Route path="/results/:q" component={resultPage} />
    </BrowserRouter>
    </ApolloProvider>



    );
  }
}

export default App;
