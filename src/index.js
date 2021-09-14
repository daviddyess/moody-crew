import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import 'icons';
import 'index.scss';

import App from 'components/App';

const client = new GraphQLClient({
  url: process.env.REACT_APP_API_URL
});

ReactDOM.render(
  <Router basename="/">
    <ClientContext.Provider value={client}>
      <App />
    </ClientContext.Provider>
  </Router>,

  document.getElementById('root')
);

export default App;
