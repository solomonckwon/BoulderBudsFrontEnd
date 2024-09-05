import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

import PulseLoader from 'react-spinners/PulseLoader'

import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Container } from '@mui/material'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    if (isLoading) return <PulseLoader color={"#FFF"} />

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <Typography
                        ref={errRef}
                        color="error"
                        variant="body1"
                        sx={{ visibility: errMsg ? 'visible' : 'hidden' }}
                    >
                        {errMsg}
                    </Typography>

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

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={persist}
                                onChange={handleToggle}
                                color="primary"
                            />
                        }
                        label="Trust This Device"
                    />

                    <Button type="submit" variant="contained" fullWidth>
                        Sign In
                    </Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <Link to="/">Back to Home</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Login
