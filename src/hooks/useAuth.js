import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isRock = false 
    let isBoulder = false 
    let isAdmin = false 
    let status = 'Pebble'


    if (token) {
        const decoded = jwtDecode(token)
        const {username, roles } = decoded.UserInfo
        
        isRock = roles.includes('Rock')
        isBoulder = roles.includes('Boulder')
        isAdmin = roles.includes('Admin')

        if (isRock) status = 'Rock'
        if (isBoulder) status = 'Boulder'
        if (isAdmin) status = 'Admin'

        return { username, roles, status, isRock, isBoulder, isAdmin }
    }

    return { username: '', roles: [], isRock, isBoulder, isAdmin, status}
}

export default useAuth