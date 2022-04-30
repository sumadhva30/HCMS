import { Button, MenuItem, Select } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';

function StudentHome(props) {

  let navigate = useNavigate();

  function viewIncidents() {
    navigate("/view-incidents");
  }

  return (
    <Button
          variant="contained"
          onClick={() => viewIncidents()}
        >
        View Incidents
      </Button>
  )
}

export default StudentHome;