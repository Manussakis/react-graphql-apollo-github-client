import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationProps, OrganizationSearchProps } from './types';

import * as routes from '../../constants/routes';
import Button from '../Button';
import Input from '../Input';

import './style.scss';

const Navigation = ({ organizationName, onOrganizationSearch }: NavigationProps) => {
  const { pathname } = useLocation();
  
  return (
    <header className="Navigation">
      <nav>
        <ul className="Navigation-list">
          <li className="Navigation-link">
            <Link to={routes.PROFILE}>Profile</Link>
          </li>
          <li className="Navigation-link">
            <Link to={routes.ORGANIZATION}>Organization</Link>
          </li>
        </ul>
      </nav>

      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch organizationName={organizationName} onOrganizationSearch={onOrganizationSearch}
        />
      )}
    </header>
  )
};

const OrganizationSearch = ({ organizationName, onOrganizationSearch }: OrganizationSearchProps) => {
  const [value, setValue] = useState(organizationName);
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    
    setValue(event.target.value);
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onOrganizationSearch(value);
  };

  return (
    <div className="Navigation-search">
      <form onSubmit={onSubmit}>
        <Input
          color={'white'}
          type="text"
          value={value}
          onChange={onChange}
        />{' '}
        <Button color={'white'} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}

export default Navigation;
