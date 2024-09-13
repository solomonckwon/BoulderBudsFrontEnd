import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateClimbMutation, useDeleteClimbMutation } from "./climbsApiSlice"
import { TextField, Button, Container, Typography, Alert, Box, Rating, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const EditClimbForm = ({ climb }) => {
    const [updateClimb, { 
        isLoading, 
        isSuccess, 
        isError, 
        error 
    }] = useUpdateClimbMutation()
    const [deleteClimb, { 
        isSuccess: isDelSuccess, 
        isError: isDelError, 
        error: delError 
    }] = useDeleteClimbMutation()
    const navigate = useNavigate()

    const [name, setName] = useState(climb.name)
    const [grade, setGrade] = useState(climb.grade)
    const [quality, setQuality] = useState(climb.quality)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setGrade('')
            setQuality('')
            navigate('/dash/climbs')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onGradeChanged = e => setGrade(e.target.value)
    const onQualityChanged = e => setQuality(e.target.value)

    const canSave = [name, grade].every(Boolean) && !isLoading

    const onSaveClimbClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateClimb({ id: climb.id, name, grade, quality })
        }
    }

    const onDeleteClimbClicked = async () => {
        await deleteClimb({ id: climb.id })
    }


    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            {isError && (
                <Alert severity="error">{error?.data?.message}</Alert>
            )}

            {isDelError && (
                <Alert severity="error">{delError?.data?.message}</Alert>
            )}

            <form onSubmit={onSaveClimbClicked}>
                <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
                    Edit Climb
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={onNameChanged}
                        error={!name}
                        helperText={!name ? "Name is required" : ""}
                        sx={{ flexGrow: 25 }}
                    />
                    <TextField
                        label="Grade"
                        variant="outlined"
                        value={grade}
                        onChange={onGradeChanged}
                        error={!grade}
                        helperText={!grade ? "Grade is required" : ""}
                        sx={{ marginLeft: '0.25em', flexGrow: 1 }}
                    />
                </Box>

                <Box display="flex" justifyContent="center">
                    <Rating
                        name="quality-rating"
                        value={quality}
                        precision={0.5}
                        onChange={onQualityChanged}
                        sx={{ mt: 2 }}
                    />
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveOutlinedIcon />}
                        type="submit"
                        disabled={!canSave}
                    >
                        Save
                    </Button>
                    <Button 
                        variant="outlined" 
                        startIcon={<DeleteIcon />}
                        onClick={onDeleteClimbClicked}
                    >
                        Delete
                    </Button>
                </Stack>
            </form>
        </Container>
    )
}

export default EditClimbForm
