import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <Container maxWidth="sm">
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: 3
                }}
            >
                <header>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to <span style={{ whiteSpace: 'nowrap' }}>BoulderBuds!</span>
                    </Typography>
                </header>
                <main>
                    <Typography variant="body1" paragraph>
                        For friendly competition to encourage the competitive spirit of climbers.
                    </Typography>
                </main>
                <footer>
                    <Button 
                        component={Link} 
                        to="/login" 
                        variant="contained" 
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        User Login
                    </Button>
                </footer>
            </Box>
        </Container>
    );
    return content;
};

export default Public;
