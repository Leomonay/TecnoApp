import React, { useEffect, useState } from 'react'
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
import WorkOrders from './pages/WorkOrders'; 
import WODetail from './pages/WODetail';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from './actions/dataActions';
import { ProtectedRoute } from './routes/ProtectedRoute';
import WorkOrderCreation from './components/forms/WOForm';

function App() {
  const {userData} = useSelector(state=>state.data)
  const [loading, setLoading]=useState(true)
  const [access, setAccess] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem('tecnoToken')
    token? dispatch(getUserFromToken()) : setLoading(false)
  },[dispatch])

  useEffect(()=>
    userData&&
    setAccess({
      isLogged: !!userData.user,
      isAdmin: userData.access==='Admin'
    }), [userData])

  useEffect(()=>Object.keys(access).length===2 && setLoading(false),[access])
  
  if(loading)return(<div className='waiting'></div>)
  if(!loading)return (
    <div className='appContainer'>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} hideNavBar={true}/>
            <Layout>
              <ProtectedRoute exact path={'/panel'} component={Panel} auth={access.isLogged}/>
              <ProtectedRoute exact path ='/ots' component={WorkOrders} auth={access.isLogged}/>
              <ProtectedRoute path ='/ots/new' component={WorkOrderCreation} auth={access.isLogged}/>
              <ProtectedRoute path ='/ots/detail/:code' component={WODetail} auth={access.isLogged}/>
              <Route exact path={'/plan'} component={Plan}/>
            </Layout>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
