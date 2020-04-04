import React from 'react';
import './App.css';
import { gql } from 'apollo-boost';
import withQuery from './hoc/withQuery';

interface TablesData {
  tables: Table[]
}
interface Table {
  id: number,
  number: number
}

const TABLES = gql`
{
  tables {
    id
    number
    clients {
      name
    }
  }
}
`;

function App(props: TablesData) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Menu 2.0</h1>
      </header>

      <ul>
        {props?.tables.map(({ number }) => (
          <li key={number}>Table number: {number}</li>
        ))}
      </ul>
    </div>
  );
}

export default withQuery(TABLES)(App);
