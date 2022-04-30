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




function ViewCategoriesPage(props) {

  const backendURL = props.backendURL;
  const categories = props.categories;
  const [selectedIndex, setSelectedIndex] = useState(1);
  

  const handleListItemClick = (
    event, index
  ) => {
    setSelectedIndex(index);
  };

  let navigate = useNavigate();

  function addCategory() {
    navigate("/add-category");
  }

  const routeChange = (category) =>{  
    navigate('/view-category');
  }

  return (
    <Container maxWidth='xl' >

      <Button
          variant="contained"
          onClick={() => addCategory()}
        >
        Add Category
      </Button>
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(incidentList)}
          {console.log(incidentList.length)} */}
            
          {categories.map((category) => (
           <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" scope="row">
              <Link to= "/view-category" state={{category: category}}>
                <Button onClick={routeChange}>
                  {category}
                </Button>
              </Link> 
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  );
};
export default ViewCategoriesPage;