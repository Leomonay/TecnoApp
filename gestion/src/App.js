import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import NavBar from './components/navigation/NavBar'
import Landing from './pages/Landing'
import Panel from './pages/Panel'
import Equipos from './pages/Equipos'
import OT from './pages/OT'


function App() {
  return (
    <div className='appContainer'>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} hideNavBar={true}/>
            <div>
              <Route path='/panel' component={Panel} />
              <Route path='/equipos' component={Equipos}/>
              <Route path='/ot' component={OT} />
            </div>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
