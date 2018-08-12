import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { SoftwareList } from './components/SoftwareList';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/software' component={SoftwareList} />
      </Layout>
    );
  }
}
