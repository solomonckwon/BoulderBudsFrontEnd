import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAddNewUserMutation } from '../users/usersApiSlice'

import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material'

const SignUp = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const navigate = useNavigate()

    const [createNewUser] = useAddNewUserMutation();

    useEffect(() => {
        setErrMsg('');
        setSuccessMsg('');
    }, [username, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrMsg('Passwords do not match');
            errRef.current.focus();
            return;
        }

        try {
            await createNewUser({
                username: username,
                password: password,
                roles: ['Pebble']
            }).unwrap()
            setSuccessMsg('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);  // Redirect after 2 seconds
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Invalid User Data');
            } else if (err.status === 409) {
                setErrMsg(err.data?.message || 'Username already exists');
            } else {
                setErrMsg(err.data?.message || 'Registration failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value)

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Sign Up
            </Typography>

            {successMsg && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMsg}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                {errMsg && (
                    <Typography
                        ref={errRef}
                        color="error"
                        variant="body1"
                        sx={{ mb: 2 }}
                    >
                        {errMsg}
                    </Typography>
                )}

                <TextField
                    label="Username"
                    variant="outlined"
                    inputRef={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={handlePwdInput}
                    fullWidth
                    required
                />

                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPwdInput}
                    fullWidth
                    required
                />

                <Button type="submit" variant="contained" fullWidth>
                    Sign Up
                </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                <Link to="/login">Login</Link>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                <Link to="/">Back to Home</Link>
            </Typography>
        </Container>
    )
}

export default SignUp
