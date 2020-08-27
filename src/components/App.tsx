import React from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Route, Link } from 'react-router-dom';
import Airport from './Airport';
import Welcome from './Welcome';
import './app.css';

export default () => {
  return (
    <>
      <div>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/flights'>
            <li>Flight table</li>
          </Link>
        </ul>
      </div>

      <Route exact path={'/'} component={Welcome} />
      <Route exact path={'/flights'} component={Airport} />
    </>
  );
};
