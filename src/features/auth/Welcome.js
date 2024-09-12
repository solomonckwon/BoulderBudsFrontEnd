import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ClimbsList from '../climbs/ClimbsList'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Welcome = () => {
    const { username, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <ClimbsList />

            <Stack spacing={2} direction="row">
            <Button variant='contained'>
                    <Link to="/dash/climbs">View Climbs</Link>
                </Button>
                <Button variant='contained'>
                    <Link to="/dash/climbs/new">Add New Climb</Link>
                </Button>
            </Stack>
            
            <Stack spacing={2} direction="row">
                <Button variant='contained'>
                    <Link to="/dash/notes">View Notes</Link>
                </Button>
                <Button variant='contained'>
                    <Link to="/dash/notes/new">Add New Note</Link>
                </Button>
            </Stack>
            
            {(isAdmin) &&
                <Stack spacing={2} direction="row">
                    <Button variant='contained'>
                        <Link to="/dash/users">View User Settings</Link>
                    </Button>
                    <Button variant='contained'>
                        <Link to="/dash/users/new">Add New User</Link>
                    </Button>
                </Stack>
            }

        </section>
    )

    return content
}
export default Welcome