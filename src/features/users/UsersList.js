import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import { useGetUsersQuery, useDeleteUserMutation } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";

const UsersList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('userList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [deleteUser] = useDeleteUserMutation();

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserId(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUserId(null);
    };

    const handleDeleteUser = async () => {
        if (selectedUserId) {
            await deleteUser({id: selectedUserId});
            handleMenuClose();
        }
    };

    let content;

    if (isLoading) content = <PulseLoader color={"#FFF"} />;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = users;

        const rows = ids?.length
            ? ids.map(userId => {
                const user = entities[userId];
                return (
                    <TableRow key={userId}>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.roles.join(', ')}</TableCell>
                        <TableCell align="right">{user.active ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell align="right">
                            <Button
                                onClick={(e) => handleMenuOpen(e, userId)}
                            >
                                Actions
                            </Button>
                        </TableCell>
                    </TableRow>
                );
            })
            : null;

        content = (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Roles</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <>
            {content}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDeleteUser}>Delete User</MenuItem>
            </Menu>
        </>
    );
};

export default UsersList;
