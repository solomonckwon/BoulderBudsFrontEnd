import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClimbsQuery } from './climbsApiSlice';
import { useGetAllCommentsForClimbQuery } from '../comments/commentsApiSlice';
import { PulseLoader } from 'react-spinners';

const Climb = () => {
    const { id } = useParams(); // Extract climbId from the URL parameters

    const navigate = useNavigate();

    const { climb } = useGetClimbsQuery("climbsList", {
        selectFromResult: ({ data }) => ({
            climb: data?.entities[id]
        }),
    });

    const { comments, isLoading: isCommentsLoading } = useGetAllCommentsForClimbQuery(id, {
        selectFromResult: ({ data }) => ({
            comments: data || []
        }),
    });

    if (!climb || isCommentsLoading) {
        return <PulseLoader color={'#FFF'} />;
    }

    const created = new Date(climb.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated = new Date(climb.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="climb-detail">
            <h2>{climb.name}</h2>
            <p><strong>Grade:</strong> {climb.grade}</p>
            <p><strong>Quality:</strong> {climb.quality}</p>
            <p><strong>Created:</strong> {created}</p>
            <p><strong>Updated:</strong> {updated}</p>


        </div>
    );
};

export default Climb;
