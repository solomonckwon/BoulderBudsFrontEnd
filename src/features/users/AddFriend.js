import React, { useState } from "react";
import { Button, Typography, Card, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useGetUsersQuery, useAddFriendMutation } from "./usersApiSlice";
import useAuth from "../../hooks/useAuth";

export default function AddFriends() {
    const { username } = useAuth(); // Get the current user's username
    const [selectedUserId, setSelectedUserId] = useState(""); // Holds the ID of the selected user
    const [error, setError] = useState(null);

    // Get all users
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id) => data?.entities[id]),
        }),
    });

    // Find the current user based on their username
    const currentUser = users?.find(user => user.username === username);

    // Mutation for adding a friend
    const [addFriend] = useAddFriendMutation();

    // Handle add friend
    const handleAddFriend = async () => {
        if (!selectedUserId) {
            setError("Please select a user.");
            return;
        }
        try {
            await addFriend({ userId: currentUser.id, friendId: selectedUserId }); // Call the mutation to add friend
            // alert(`${friend.username} has been added as a friend!`);
        } catch (err) {
            setError(err)
        }
    };

    return (
        <Card variant="outlined">
            <Grid container direction="column" justifyContent="center" alignItems="center">
                {/* Select User from Dropdown */}
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center", width: '70%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-user-label">Select User</InputLabel>
                        <Select
                            labelId="select-user-label"
                            value={selectedUserId}
                            label="Select User"
                            onChange={(e) => {
                                setSelectedUserId(e.target.value);
                                setError(null);
                            }}
                            fullWidth
                        >
                            {users?.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx>
                    <Button variant="contained" onClick={handleAddFriend} fullWidth sx={{ mt: 2, mb: 2, }}>
                        Add Friend
                    </Button>
                </Grid>

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Grid>
        </Card>
    );
}
