import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import Climb from './features/climbs/Climb'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ClimbsList from './features/climbs/ClimbsList'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  useTitle('BoulderBuds')
  return (
    <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)] } />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>

                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ ROLES.Boulder, ROLES.Admin] } />}>
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=':id' element={<EditUser/>}/>
                      <Route path='new' element={<NewUserForm/>}/>
                    </Route>
                  </Route>

                    <Route path="notes">
                      <Route index element={<NotesList />} />
                      <Route path=':id' element={<EditNote/>}/>
                      <Route path='new' element={<NewNote/>}/>
                    </Route>

                    <Route path="climbs">
                      <Route index element={<ClimbsList />} />
                      <Route path=":id" element={<Climb />} />
                    </Route>
                  

                </Route>{/* End Dash */}
              </Route>
            </Route>
          </Route>
          {/* end of protected routes */}

        </Route>
      </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
