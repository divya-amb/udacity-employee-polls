import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from "redux";
import reducer from "../../reducers";
import middleware from "../../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import { handleLogin } from "../../actions/authedUser";

describe('App', () => {
  it('will render username and password login form with no error initially', async () => {
    const store = createStore(reducer, middleware);
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  
    expect(screen.queryByTestId('empty-error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('will show error message for empty values', async () => {
    const store = createStore(reducer, middleware);
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  
    var submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(screen.getByTestId('empty-error-message')).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
