import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClimbsQuery } from './climbsApiSlice';
import { CircularProgress, Container, Typography, Box, Rating } from '@mui/material';

const ClimbDetails = () => {
    const { id } = useParams(); // Extract climbId from the URL parameters

    const { climb } = useGetClimbsQuery("climbsList", {
        selectFromResult: ({ data }) => ({
            climb: data?.entities[id]
        }),
    });

    if (!climb) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    const created = new Date(climb.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated = new Date(climb.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexFlow: 'column nowrap', gap: '0.75em', mt: '1em' }}>

            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" component="h2" gutterBottom>
                    {climb.name}
                </Typography>
                <Rating
                    name="read-only"
                    value={climb.quality}
                    precision={0.5} // Allow half stars
                    readOnly
                    sx={{ ml: 2 }} // Add some margin between the name and rating
                />
            </Box>

            <Typography variant="h6" gutterBottom>
                <strong>Grade:</strong> {climb.grade}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="b1" gutterBottom>Created:<br />{created}</Typography>
                <Typography variant="b1" gutterBottom>Updated:<br />{updated}</Typography>
            </Box>
        </Container>
    );
};

export default ClimbDetails;
