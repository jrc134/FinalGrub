import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import DonationDetails from './components/DonationDetails/DonationDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import DonationHome from './components/Home/DonationHome';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import AboutUs from './components/AboutUs/AboutUs';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/donations" exact component={DonationHome} />
          <Route path="/donations/search" exact component={DonationHome} />
          <Route path="/donations/:id" exact component={DonationDetails} />
          <Route path={['/creators/:creator/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/about" exact component={AboutUs} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
