import * as React from 'react';
import { 
    Table, 
    Rating, 
    TableBody, 
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
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
                        <TableCell align="right">
                            <Rating
                                name="read-only"
                                value={climb.quality}
                                precision={0.5} // Allow half stars
                                readOnly
                            />
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/dash/climbs/details/${climbId}`)}
                            >
                                View Details
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx ={{ ml: 1}}
                                onClick={() => navigate(`/dash/climbs/edit/${climbId}`)}
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

    return content;
}
