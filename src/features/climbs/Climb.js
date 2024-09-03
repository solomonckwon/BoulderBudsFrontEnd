import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClimbsQuery } from './climbsApiSlice';
import { PulseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Climb = () => {
    const { id } = useParams(); // Extract climbId from the URL parameters
    const navigate = useNavigate();

    const { climb } = useGetClimbsQuery("climbsList", {
        selectFromResult: ({ data }) => ({
            climb: data?.entities[id]
        }),
    });

    if (!climb) {
        return <PulseLoader color={'#FFF'} />;
    }

    const created = new Date(climb.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated = new Date(climb.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const handleEdit = () => navigate(`/dash/climbs/edit/${id}`);

    return (
        <div className="climb-detail">
            <h2>{climb.name}</h2>
            <p><strong>Grade:</strong> {climb.grade}</p>
            <p><strong>Quality:</strong> {climb.quality}</p>
            <p><strong>Status:</strong> {climb.completed ? 'Completed' : 'Open'}</p>
            <p><strong>Created:</strong> {created}</p>
            <p><strong>Updated:</strong> {updated}</p>

            {/* <button
                className="icon-button"
                onClick={handleEdit}
            >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Climb
            </button> */}
        </div>
    );
};

export default Climb;
