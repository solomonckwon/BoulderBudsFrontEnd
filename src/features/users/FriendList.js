import {
    Card,
    Button,
    Paper,
    Box,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useRemoveFriendMutation } from "./usersApiSlice";

// STYLES

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
}));

export default function FriendList({ currentUser, friends }) {
    const [removeFriend, {
        isSuccess,
        isError,
        error
    }] = useRemoveFriendMutation()

    return (
    <Card variant="outlined" sx={{ width: '100%', padding: 2 }}>
        <Grid 
            container
            rowSpacing={1}
            direction="column"
        >
            {friends?.map((friend, index) => (
                <Grid item xs={12} key={index}>
                    <Item>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h6">{friend.username}</Typography>
                                <Typography color="text.secondary">{friend.roles.join(", ")}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ marginLeft: 'auto' }}
                                onClick={() => removeFriend({ userId: currentUser._id, friendId: friend.id })}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Item>
                </Grid>
            ))}
        </Grid>
    </Card>


    );
}
