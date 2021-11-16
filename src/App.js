import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';
import Landing from './pages/Landing'
import Layout from './layout/index';
import Panel from './pages/Panel'
import Plan from './pages/Plan';
import WorkOrders from './pages/WorkOrder'; 
import WODetail from './pages/WODetail';

function App() {
  return (
    <div className='appContainer'>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} hideNavBar={true}/>
            <Layout>
              <Route exact path={['/panel','/panel/:option']} component={Panel} />
              <Route path ='/ots/crear' component={WorkOrders}/>
              <Route path ='/ots/detail/:code' component={WODetail}/>
              <Route exact path={'/plan'} component={Plan} />
            </Layout>
          </Switch>
        </Router>
    </div>
  );
}

export default App;