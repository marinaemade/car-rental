import React from 'react'
import { useAuth } from './AuthContext'
import NotFound from './../pages/notFound/NotFound';

const LoggedUsers = ({children}) => {
    const {logged} = useAuth();
    
    if (!logged) {
        return <NotFound/>;
    }
    
    return children;
}

export default LoggedUsers