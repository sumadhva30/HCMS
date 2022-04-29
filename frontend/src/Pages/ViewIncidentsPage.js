import React, {useState, useEffect} from "react";
import { Select, MenuItem, Stack} from "@mui/material";
import { InputLabel, TextField} from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import { FormControl } from "@mui/material";
import { STUDENT, ADMIN, RESPONDER } from "../App";




function ViewIncidentsPage(props) {

  const backendURL = props.backendURL;
  const userType = props.userType;
  const categories = props.categories;
  const email = props.email;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [incidentSub, setIncidentSub] = useState(null);
  const [incidentCat, setIncidentCat] = useState(null);
  const [incidentRes, setIncidentRes] = useState(null);
  const [incidentList, setIncidentList] = useState([]);
  

  const handleListItemClick = (
    event, index
  ) => {
    setSelectedIndex(index);
  };

  var respEmail = null, stuEmail = null;
  console.log(userType)
  if (userType === STUDENT){
    stuEmail = email;
    console.log(stuEmail)
  }
  else if(userType === RESPONDER)
    respEmail = email;

  useEffect(() => {
    fetch(`${backendURL}/IncidentQuery`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({ 
        cat: incidentCat,
        sub: incidentSub,
        resolved: incidentRes,
        std_info: {
          _id: stuEmail
        },
        resp_id: respEmail 
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        console.log(stuEmail)
        setIncidentList(res);
        console.log("hello")
        console.log(incidentList)
      });
  },[incidentCat, incidentRes, incidentSub]);  
  // incidentCat, incidentSub, incidentRes

  const onSubChange = (e) => {
    if (e.target.value === '') 
      setIncidentSub(null);
    else
      setIncidentSub(e.target.value);
  }
   
  let navigate = useNavigate(); 
  const routeChange = (incident) =>{  
    navigate(`/view-oncall\{in}`);
  }

  return (
    <Container maxWidth='xl' >
      
      <Stack direction={'row'} spacing={4}>
      <InputLabel id="resolved">Resolved</InputLabel>
      <Select
          id="res"
          label="Resolved"
          value={incidentRes}
          onChange={(e) => {setIncidentRes(e.target.value); incidentRes ? console.log('true'):console.log('false')}}
        >
          <MenuItem value={'true'} >Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
          <MenuItem value={null}>All</MenuItem>
      </Select>
      <Select
          label="Category"
          value={incidentCat}
          onChange={(e) => {console.log(e.target.value); setIncidentCat(e.target.value)}}
        >
          { categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
          <MenuItem value = {null}> All</MenuItem>
      </Select>
      <TextField
          label="Subject"
          variant="outlined" 
          value={incidentSub} 
          onChange={(e) => onSubChange(e)}
      />
      </Stack>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Assigned&nbsp;</TableCell>
            <TableCell align="right">Category&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(incidentList)}
          {console.log(incidentList.length)} */}
            
          {incidentList.map((incident) => (
           <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell align="left" scope="row">
              <Link to="/view-oncall">
                <Button onClick={routeChange}>
                  {incident.sub}
                </Button>
              </Link> 
              </TableCell>
              <TableCell align="right">{incident.resolved ? 'resolved' : 'not resolved'}</TableCell>
              <TableCell align="right">{incident.assigned ? 'assigned' : 'not assigned'}</TableCell>
              <TableCell align="right">{incident.cat}</TableCell>
            </TableRow>
            
          ))}
          {console.log(incidentList)}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  );
};
export default ViewIncidentsPage;