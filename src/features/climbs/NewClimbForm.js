import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewClimbMutation } from "./climbsApiSlice"
import { TextField, Button, Container, Typography, Alert, Box, Rating } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const NewClimbForm = ({ users }) => {
    const [addNewClimb, { isLoading, isSuccess, isError, error }] = useAddNewClimbMutation()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [grade, setGrade] = useState('')
    const [quality, setQuality] = useState()

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setGrade('')
            setQuality('')
            navigate('/dash/climbs')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onGradeChanged = e => setGrade(e.target.value)
    const onQualityChanged = e => setQuality(e.target.value)

    const canSave = [name, grade].every(Boolean) && !isLoading

    const onSaveClimbClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewClimb({ name, grade, quality })
        }
    }


    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            {isError && (
                <Alert severity="error">{error?.data?.message}</Alert>
            )}

            <form onSubmit={onSaveClimbClicked}>
                <Typography variant="h4" sx={{textAlign: 'center'}}gutterBottom>
                    Create a New Climb
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

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<SaveOutlinedIcon />}
                    type="submit"
                    disabled={!canSave}
                    sx={{ mt: 4}}
                >
                    Save
                </Button>

            </form>
        </Container>
    )
}

export default NewClimbForm
