import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from "../../reducers";
import middleware from "../../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

describe('App', () => {
  it('will match snapshot', () => {
    const store = createStore(reducer, middleware);
    const view = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  
    expect(view).toMatchSnapshot();
  });

  it('will render the Employee Polls application', () => {
    const store = createStore(reducer, middleware);
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  
    expect(screen.getByText("Employee Polls")).toBeInTheDocument();
  });
});
