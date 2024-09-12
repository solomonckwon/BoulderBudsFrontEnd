import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewClimbMutation } from "./climbsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { TextField, Button, Container, Typography, Alert, Stack } from '@mui/material'

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

    const errClass = isError ? "errmsg" : "offscreen"

    return (
        <Container maxWidth="sm">
            {isError && (
                <Alert severity="error">{error?.data?.message}</Alert>
            )}

            <form onSubmit={onSaveClimbClicked}>
                <Typography variant="h4" gutterBottom>
                    Create a New Climb
                </Typography>

                <Stack spacing={2}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={onNameChanged}
                            error={!name}
                            helperText={!name ? "Name is required" : ""}
                        />


                        <TextField
                            label="Grade"
                            variant="outlined"
                            fullWidth
                            value={grade}
                            onChange={onGradeChanged}
                            error={!grade}
                            helperText={!grade ? "Grade is required" : ""}
                        />

                        <TextField
                            label="Quality"
                            variant="outlined"
                            fullWidth
                            value={quality}
                            onChange={onQualityChanged}
                            type="number"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<FontAwesomeIcon icon={faSave} />}
                            type="submit"
                            disabled={!canSave}
                        >
                            Save
                        </Button>

                </Stack>
            </form>
        </Container>
    )
}

export default NewClimbForm
