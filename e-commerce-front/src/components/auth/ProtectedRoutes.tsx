import { useAppSelector } from '@store/hooks'
import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAppSelector(state => state.authSlice.accessToken)
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/contact/login?message=login_required')
        }
    }, [accessToken, navigate])


    // If there is an accessToken, render the children components
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes
