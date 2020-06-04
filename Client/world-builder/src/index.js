import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// on met App dans le router en-dessous - dans ReactDOM.render
// les routes se trouvent dans app.js
import { BrowserRouter } from 'react-router-dom';

// connexion au serveur
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost'

const client = new ApolloClient ({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    query Assert {
      projectSchemaAssert
    }
  `
}).then(result => console.log("Graphql response to projectSchemaAssert : ", result))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// ou doc MDN : https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API
serviceWorker.register();
