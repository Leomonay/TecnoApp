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
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from './actions/dataActions';
import { ProtectedRoute } from './routes/ProtectedRoute';
import AdminPanel from './pages/Admin/AdminPanel';
import WorkOrder from './components/forms/WorkOrder';
import { getPlan } from './actions/planActions';

function App() {
  const {userData} = useSelector(state=>state.people)
  const [loading, setLoading]=useState(true)
  const [access, setAccess] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem('tecnoToken')
    token? dispatch(getUserFromToken()) : setLoading(false)
  },[dispatch])

  useEffect(()=>{
    userData&&
    setAccess({
      isLogged: !!userData.user,
      isAdmin: userData.access==='Admin'
    })
    if(userData && userData.user){
        const {plant, user, access} = userData
        const year = (new Date()).getFullYear()
        dispatch(getPlan( plant && access !== 'admin' ? {year,plant,user} : {year} ))
      }
    }, [dispatch, userData])
  
  

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
              {/* <ProtectedRoute path ='/ots/new' component={WorkOrderCreation} auth={access.isLogged}/> */}
              <ProtectedRoute path ='/ots/new' component={WorkOrder} auth={access.isLogged}/>
              <ProtectedRoute path ='/ots/detail/:otCode' component={WorkOrder} auth={access.isLogged}/>
              <ProtectedRoute path ='/ots/edit/:otCode' component={WorkOrder} auth={access.isLogged}/>

              <ProtectedRoute path ={['/admin/:selected','/admin']} component={AdminPanel} auth={access.isAdmin}/>
              {/* <ProtectedRoute path ='/admin/users' component={AdminUsers} auth={access.isAdmin}/> */}
              <Route exact path={'/plan'} component={Plan}/>
            </Layout>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
