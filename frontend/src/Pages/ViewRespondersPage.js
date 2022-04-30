import React, {useState, useEffect} from "react";
import { Select, MenuItem, Stack} from "@mui/material";
import { InputLabel, TextField} from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { Link } from "@mui/material";
import { Link } from "react-router-dom";
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
  const [responderName, setResponderName] = useState(null);
  const [responderCat, setResponderCat] = useState(null);
  const responderList = props.responders
  const setResponderList = props.setResponders
  

  const handleListItemClick = (
    event, index
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    fetch(`${backendURL}/ResponderQuery`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cat: responderCat
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res");
        console.log(res);
        setResponderList(res);
        console.log("Responder List");
        console.log(responderList);
      });
  },[responderCat, responderName]);  
  // incidentCat, incidentSub, incidentRes

  let navigate = useNavigate();

  function addResponder() {
    navigate("/add-responder");
  }

  const routeChange = (responder) =>{  
    navigate('/view-responder');
  }

  return (
    <Container maxWidth='xl' >

      <Button
          variant="contained"
          onClick={() => addResponder()}
        >
        Add Responder
      </Button>
      
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
              <Link to= "/view-responder" state={{id: responder._id}}>
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