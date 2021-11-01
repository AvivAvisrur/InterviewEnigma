import './App.css';
import{ dummyData } from './Components/dummyData';
import store from './store/store';
import { dataActions } from './store/data-slice';
import * as React from 'react';
import Layout from './Components/Layout';




function App() {
  store.dispatch(dataActions.addData(dummyData));
  return (
    <>
      <Layout/>
    </>
  )
}

export default App;
