import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Logo from "../assets/Logo.svg";
import { useNavigate, Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // For hamburger menu icon
import Drawer from '@mui/material/Drawer'; // Drawer for responsive menu
import useMediaQuery from '@mui/material/useMediaQuery'; // To handle media queries

export default function DashboardSidebar() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [sendLogout] = useSendLogoutMutation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Handle the opening and closing of the drawer on mobile
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        sendLogout();
        navigate('/');
    };

    // Detect if the screen is small (like mobile)
    const isMobile = useMediaQuery('(max-width:600px)');

    const drawerContent = (
        <Paper
            sx={{
                width: 240,
                height: '100%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
            }}
        >
            <Link to="/dash">
                <h2 className="dash-header__title">
                    <img src={Logo} alt="" />BoulderBuds
                </h2>
            </Link>
            <MenuList sx={{ flexGrow: 1 }}>
                <Divider />
                <Link to="/dash/climbs">
                    <MenuItem>
                        <ListItemIcon>
                            <SegmentOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View Climbs</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/dash/climbs/new">
                    <MenuItem>
                        <ListItemIcon>
                            <AddCircleOutlineOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Add New Climb</ListItemText>
                    </MenuItem>
                </Link>
                <Divider />
                <Link to="/dash/notes">
                    <MenuItem>
                        <ListItemIcon>
                            <TextSnippetOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View Notes</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/dash/notes/new">
                    <MenuItem>
                        <ListItemIcon>
                            <NoteAddOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Add New Note</ListItemText>
                    </MenuItem>
                </Link>
                <Divider />
                {isAdmin && (
                    <>
                        <Link to="/dash/users">
                            <MenuItem>
                                <ListItemIcon>
                                    <NoteAddOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>View User Settings</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to="/dash/users/new">
                            <MenuItem>
                                <ListItemIcon>
                                    <NoteAddOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add New User</ListItemText>
                            </MenuItem>
                        </Link>
                        <Divider />
                    </>
                )}
            </MenuList>
            <Box sx={{ p: 2 }}>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                </MenuItem>
            </Box>
        </Paper>
    );

    return (
        <>
            {isMobile ? (
                <>
                    {/* Mobile: Hamburger Menu Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 2, mt: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Mobile: Drawer */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            '& .MuiDrawer-paper': { width: 240 },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </>
            ) : (
                // Desktop: Permanent Sidebar
                <Paper
                    sx={{
                        width: 240,
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 3,
                    }}
                >
                    {drawerContent}
                </Paper>
            )}
        </>
    );
}
