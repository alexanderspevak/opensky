import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default () => (
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
