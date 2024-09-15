import useAuth from "../../hooks/useAuth"
import { useGetUsersQuery } from './usersApiSlice'

// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Button";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1"
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499"
  }
};

//APP
export default function ProfileCard({ currentUser }) {

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    // Get all friends of the current user
    const friends = currentUser?.friends?.map(friendId =>
        users.find(user => user._id === friendId)
    );

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
            >{currentUser.username[0]}</Avatar>
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{currentUser.username}</Typography>
          <Typography color="text.secondary">{currentUser.roles.join(", ")}</Typography>
        </Grid>
        {/* CARD HEADER END */}
    

    </Grid>

    <Divider />

      
    </Card>
  );
}
