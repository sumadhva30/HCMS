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




function ViewRespondersPage(props) {

  const backendURL = props.backendURL;
  const userType = props.userType;
  const categories = props.categories;
  const email = props.email;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [responderID, setResponderID] = useState(null);
  const [responderName, setResponderName] = useState(null);
  const [responderCat, setResponderCat] = useState(null);
  const responderList = props.responders
  const setResponderList = props.setResponders
  

  const handleListItemClick = (
    event, index
  ) => {
    setSelectedIndex(index);
  };

  var respEmail = null, stuEmail = null;
  console.log(userType)
  respEmail = email;

  useEffect(() => {
    fetch(`${backendURL}/ResponderQuery`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({ 
        _id: respEmail,
        cat: responderCat, 
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setResponderList(res);
        console.log("hello")
        console.log(responderList)
      });
  },[responderCat, responderID, responderName]);  
  // incidentCat, incidentSub, incidentRes

  const onSubChange = (e) => {
    if (e.target.value === '') 
      setResponderID(null);
    else
      setResponderID(e.target.value);
  }
   
  let navigate = useNavigate(); 
  const routeChange = (incident) =>{  
    navigate('/view-responder');
  }

  return (
    <Container maxWidth='xl' >
      
      <Stack direction={'row'} spacing={4}>
      <Select
          label="Category"
          value={responderCat ? responderCat : 'All'}
          onChange={(e) => {setResponderCat(e.target.value != 'All' ? e.target.value : null)}}
        >
          { categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
          <MenuItem value = {'All'}> All</MenuItem>
      </Select>
      <TextField
          label="Name"
          variant="outlined" 
          value={responderName} 
          onChange={(e) => onSubChange(e)}
      />
      </Stack>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name&nbsp;</TableCell>
            <TableCell align="right">Category&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(incidentList)}
          {console.log(incidentList.length)} */}
            
          {responderList.map((responder) => (
           <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell align="left" scope="row">
              <Link to="/view-oncall">
                <Button onClick={routeChange}>
                  {responder._id}
                </Button>
              </Link> 
              </TableCell>
              <TableCell align="right">{responder.name}</TableCell>
              <TableCell align="right">{responder.category}</TableCell>
            </TableRow>
            
          ))}
          {console.log(responderList)}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  );
};
export default ViewRespondersPage;