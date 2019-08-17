//@format
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import Home from './Home';
import ReactGA from 'react-ga';
ReactGA.initialize('G-9XWGSG5VCC');
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  return (
    <Router>
      <Route
        path='/:type?/:id(\d+)?'
        render={RouteProps => <Home {...RouteProps} />}
      />
    </Router>
  );
};

export default App;
