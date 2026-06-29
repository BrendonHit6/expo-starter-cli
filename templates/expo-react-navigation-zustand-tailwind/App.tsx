import './src/global.css';
import React from 'react';
import NavigationContainer from './src/navigation/NavigationContainer';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer />
    </ErrorBoundary>
  );
}
