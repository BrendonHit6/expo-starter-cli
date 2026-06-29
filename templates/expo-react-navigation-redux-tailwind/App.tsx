import './src/global.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import NavigationContainer from './src/navigation/NavigationContainer';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    </ErrorBoundary>
  );
}
