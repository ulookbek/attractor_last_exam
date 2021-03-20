import React from 'react';
import { useSelector } from "react-redux";
import Routes from "./Routes";
import Layout from "./components/Layout/Layout";

const App = () => {
  const user = useSelector(state => state.users.user);
  return (
    <Layout>
      <Routes user={user} />
    </Layout>
  )
};

export default App;
