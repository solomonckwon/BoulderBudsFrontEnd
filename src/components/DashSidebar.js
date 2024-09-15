import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { 
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Box,
    Drawer,
    useMediaQuery,
    IconButton
} from '@mui/material';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Logo from "../assets/Logo.svg";
import { useNavigate, Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import MenuIcon from '@mui/icons-material/Menu'; // For hamburger menu icon
import { Avatar } from '@mui/material';

export default function DashboardSidebar() {
    const { username, isAdmin } = useAuth();
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

                <MenuItem component={Link} to="/dash/climbs">
                    <ListItemIcon>
                        <SegmentOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Climbs</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/dash/climbs/new">
                    <ListItemIcon>
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add New Climb</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/dash/notes">
                    <ListItemIcon>
                        <TextSnippetOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Notes</ListItemText>
                </MenuItem>

                <MenuItem component={Link} to="/dash/notes/new">
                    <ListItemIcon>
                        <NoteAddOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add New Note</ListItemText>
                </MenuItem>

                <Divider />
                {isAdmin && (
                    <Box>
                        <MenuItem component={Link}to="/dash/users">
                            <ListItemIcon>
                                <NoteAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>View User Settings</ListItemText>
                        </MenuItem>
                        <MenuItem component={Link} to="/dash/users/new">
                            <ListItemIcon>
                                <NoteAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Add New User</ListItemText>
                        </MenuItem>
                        <Divider />
                    </Box>
                )}
            </MenuList>
            <Box sx={{ p: 2 }}>
                <MenuItem component={Link} to='/dash/users/profile'>
                    <ListItemIcon>
                        <Avatar sx={{ width: 30, height: 30 }}>{username[0]}</Avatar>
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="medium" />
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
