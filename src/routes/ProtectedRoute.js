import { Route, Redirect } from "react-router-dom";
export function ProtectedRoute({auth, component: Component,...rest}){

    return (<Route {...rest}>
        {auth? 
            <Component/>
            :<Redirect to='/'/>}
    </Route>)
}