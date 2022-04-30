import { Button, MenuItem, Select } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';

function AdminHome(props) {

  let navigate = useNavigate();

  function viewIncidents() {
    navigate("/view-incidents");
  }

  function viewOnCall() {
    navigate("/view-oncall");
  }

  return (
    <div>
      <Button
            variant="contained"
            onClick={() => viewIncidents()}
          >
          View Incidents
        </Button>
        <Button
        variant="contained"
        onClick={() => viewOnCall()}
      >
      View Incidents
    </Button>
  </div>
  )
}

export default AdminHome;