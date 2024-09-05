import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import Button component from MUI
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { useGetClimbsQuery } from './climbsApiSlice';
import { PulseLoader } from 'react-spinners';

export default function ClimbsList() {
    const navigate = useNavigate(); // Initialize useNavigate

    const {
        data: climbs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetClimbsQuery('climbsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) content = <PulseLoader color={'#FFF'} />;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = climbs;

        const rows = ids?.length
            ? ids.map(climbId => {
                const climb = entities[climbId];
                return (
                    <TableRow key={climbId}>
                        <TableCell>{climb.name}</TableCell>
                        <TableCell align="right">{climb.grade}</TableCell>
                        <TableCell align="right">{climb.quality}</TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/dash/climbs/${climbId}`)}
                            >
                                View Details
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx ={{ ml: 1}}
                            >
                                Edit
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
                            <TableCell>Climb</TableCell>
                            <TableCell align="right">Grade</TableCell>
                            <TableCell align="right">Quality</TableCell>
                            <TableCell align="right">Actions</TableCell> {/* New Actions column */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return content;
}
