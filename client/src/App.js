import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import{
  ApolloClient, 
  MemoryCache, 
  ApolloProvider, 
  urlLink,
} from '@apollo/client';
import { setContext } from '@apollo/client.link.context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// add in GraphQL endpoing
const urlLink = createUrlLink({
  uri: '/graphql',
});

const auth = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(urlLink),
  cache: new MemoryCache(),
});

function App() {
  return (
    // add Apollo
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
