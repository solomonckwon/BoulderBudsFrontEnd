import { 
    Table, 
    TableBody, 
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';

import { useGetUsersQuery } from "./usersApiSlice"
import { PulseLoader } from "react-spinners"

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('userList', {
        pollingInterval: 60000, //In milliseconds
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = users

        const rows = ids?.length
            ? ids.map(userId => {
                const user = entities[userId];
                return (
                    <TableRow key={userId}>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.roles}</TableCell>
                        <TableCell align="right">{user.active}</TableCell>
                        <TableCell align="right">
                            <Button>
                                Button
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
        )
    }

    return content
}
export default UsersList