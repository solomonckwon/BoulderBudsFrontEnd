import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import ClimbsList from '../climbs/ClimbsList';
import NotesList from '../notes/NotesList';
import Box from '@mui/material/Box';

const Welcome = () => {
    const { username } = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: '95vh' }}>
            <Box sx={{ flex: 1 }}>
                <h1>Welcome {username}!</h1>
    
                <h3>Climbs</h3>
                <ClimbsList />
    
                <h3>Notes</h3>
                <NotesList />
            </Box>

            <Typography sx={{ alignSelf: 'flex-end', p: 1 }}>
                {today}
            </Typography>
        </Box>
    );

    return content;
}

export default Welcome;
