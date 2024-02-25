import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todos';
import authReducer from './features/auth/auth';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer
  } 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>  // if I uncomment this, refresh token request will fail because it will be sent twice.
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  // </React.StrictMode>
);