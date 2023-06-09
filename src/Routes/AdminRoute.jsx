import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import useAdmin from '../Hooks/useAdmin'
import { Children } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    const navigate = useNavigate()
    console.log(isAdmin, isAdminLoading)
    if(loading || isAdminLoading) return <div><progress className='progress w-96'></progress></div>;

    if(user && isAdmin) return children;

    return navigate('/', {replace:true})
  
}

export default AdminRoute