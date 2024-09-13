import { Outlet } from 'react-router-dom'
import DashSidebar from './DashSidebar'

const DashLayout = () => {
    return (
        <>
            <DashSidebar />
            <div className="dash-container">
                <Outlet />
            </div>
        </>
    )
}
export default DashLayout