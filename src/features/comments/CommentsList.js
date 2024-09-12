import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button'; // Import Button component from MUI
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { useGetCommentsQuery } from './commentsApiSlice';
import { PulseLoader } from 'react-spinners';

export default function CommentsList({ climbId }) {
    // const navigate = useNavigate(); // Initialize useNavigate


    const {
        data: comments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCommentsQuery('commentsList', {
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
        const { ids, entities } = comments;

        
        let filteredIds = ids.filter(commentId => entities[commentId].climbId === climbId)

        const rows = filteredIds?.length
            ? filteredIds.map(commentId => {
                const comment = entities[commentId];
                return (
                    <TableRow key={commentId}>
                        <TableCell>{comment.author}</TableCell>
                        <TableCell align="center">{comment.text}</TableCell>
                    </TableRow>
                );
            })
            : null;

        content = (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: '150px' }}>Author</TableCell> {/* Set the width here */}
                            <TableCell align="center"></TableCell>
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
