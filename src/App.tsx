import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Outlet } from 'react-router-dom'

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.scss';

const GET_GITHUB_USER = gql`
  query {
    viewer {
      id
      login
      name
      repositories(first: 5 orderBy: {direction: DESC, field: STARGAZERS}) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

function App() {
  const [organizationName, setOrganizationName] = useState('facebook');
  
  const onOrganizationSearch = (value: string) => {
    setOrganizationName(value);
  };

  return (
    <div className="App">
      <Navigation organizationName={organizationName} onOrganizationSearch={onOrganizationSearch} />
      <h1>Github Client</h1>
      <div className="App-content_small-header">
        <Outlet context={organizationName} />
      </div>
      <Footer />
    </div>
  )
}

export default App
