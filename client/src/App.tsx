import React from "react";
import "./App.scss"

import Header from "./Header/Header";
import Main from "./Main/Main";
import Modal from './Modal//Modal';
import Notifications from './Notifications/Notifications';
import AuthProvider from './AuthProvider/AuthProvider';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Notifications />
        <Header />
        <Main />
        <Modal />
      </AuthProvider>
    </>
  )
};

export default App;