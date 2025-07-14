import React from "react";
import { Provider } from 'react-redux';

import "./App.scss"
import { store } from "./redux/store";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Modal from './Modal//Modal';
import Notifications from './Notifications/Notifications';
import AuthProvider from './AuthProvider/AuthProvider';
import ApolloWrapper from './Apollo/Apollo';

const App = () => {
  return (
    <>
      <AuthProvider>
        <ApolloWrapper>
          <Provider store={store}>
            <Notifications />
            <Header />
            <Main />
            <Modal />
          </Provider>
        </ApolloWrapper>
      </AuthProvider>
    </>
  )
};

export default App;