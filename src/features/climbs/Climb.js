import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClimbsQuery } from './climbsApiSlice';
import { useGetAllCommentsForClimbQuery } from '../comments/commentsApiSlice';
import { PulseLoader } from 'react-spinners';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import CommentsList from '../comments/CommentsList'

const Climb = () => {
    const { id } = useParams(); // Extract climbId from the URL parameters
    const navigate = useNavigate();

    const { climb } = useGetClimbsQuery("climbsList", {
        selectFromResult: ({ data }) => ({
            climb: data?.entities[id]
        }),
    });

    if (!climb ) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    const created = new Date(climb.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated = new Date(climb.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <Container maxWidth="sm" sx={{ mt: 7 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    {climb.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Grade:</strong> {climb.grade}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Quality:</strong> {climb.quality}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Created:</strong> {created}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Updated:</strong> {updated}
                </Typography>
            </Paper>

            <CommentsList climbId={id} />

        </Container>
    );
};

export default Climb;
