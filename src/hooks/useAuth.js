import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false 
    let isAdmin = false 
    let status = null

    if (token) {
        const decoded = jwtDecode(token)
        const {username, roles } = decoded.UserInfo
        
        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        let status = 'Employee'
        if (isManager) status = 'Manager'
        // Check admin after manager, since admin is a higher permission role
        if (isAdmin) status = 'Admin'

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status}
}

export default useAuth