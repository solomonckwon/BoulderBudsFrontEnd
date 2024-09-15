import * as React from 'react';
import DashSidebar from './DashSidebar';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const DashLayout = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <DashSidebar />

            {/* Content container, margin adjusted based on screen size */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: isMobile ? 0 : '240px', // If not mobile, apply margin for sidebar width
                    mt: isMobile ? '56px' : '0px', // Mobile adjustment for top bar or menu icon
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashLayout;
