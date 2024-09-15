import useAuth from "../../hooks/useAuth"
import { useGetUsersQuery } from "./usersApiSlice"
import ProfileCard from "./ProfileCard"
import AddFriend from "./AddFriend"
import FriendList from "./FriendList"

import Grid from "@mui/material/Grid2"

export default function Profile() {
    const { username } = useAuth()

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

        // Find the current user based on their username
    const currentUser = users?.find(user => user.username === username);

    // Get all friends of the current user
    const friends = currentUser?.friends?.map(friendId =>
        users.find(user => user._id === friendId)
    );

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <ProfileCard currentUser={currentUser}/>
            </Grid>
            <Grid size={6}>
                <AddFriend />
            </Grid>

            <Grid size={12}>
                <FriendList currentUser={currentUser} friends={friends} />
            </Grid>
        </Grid>
    
    )
}