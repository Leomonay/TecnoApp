import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';
import Landing from './pages/Landing'
import OptionPanel from './pages/Panel';
import Panel from './pages/Panel'


function App() {
  return (
    <div className='appContainer'>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} hideNavBar={true}/>
            <div>
              <Route exact path={['/panel','/panel/:option']} component={Panel} />
            </div>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
