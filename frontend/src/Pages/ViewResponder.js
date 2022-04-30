import { Button, TextField, Container, Stack, InputLabel, Select, MenuItem } from "@mui/material";
import { STUDENT,RESPONDER, ADMIN, LOGGEDOUT } from "../App";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#B2E7C8',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3D0CD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9B5A6',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item4 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#B4ACAA',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ViewResponder(props) {
  console.log("check below")
  const responders = props.responders
  console.log(responders)
  const location = useLocation()
  const { id } = location.state
  console.log(id)
  const responder = responders.find(x => x._id === id)
  console.log(responder)
  const toast = props.toast;
  const categories = props.categories;

    const userType = ADMIN
    let navigate = useNavigate();
    const id_ = responder._id
    const [name_, setName] = useState(''); 
    const [category_, setCategory] = useState('');
    const sender_email = "responder@iith.ac.in";
    const timestamp = new Date();
    const backendURL = "http://localhost:8000"; 

    
    const updateRecord = (e) => {
        console.log(JSON.stringify({
          _id: id_,
          name: name_,
          category: [category_]
        }));
      fetch(`${backendURL}/admin/updateResponderInfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          _id: id_,
          name: name_,
          category: [category_]
        })
      }).then((res) => {
        if (res.ok) {
          toast("success", "Responder Updated!");
          navigate("/view-responders");
        }
      });
    };

    const deleteRecord = (e) => {
        console.log(JSON.stringify({_id: id_}));
      fetch(`${backendURL}/admin/delResponderInfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({_id: id_})
      }).then((res) => {
        if (res.ok) {
          toast("success", "Responder Deleted!");
          navigate("/view-responders");
        }
      });
    };

    return (
      <Container>
        <Stack spacing={2}>
          <TextField
            label="Responder ID"
            defaultValue={id_}
            variant="outlined"
            inputProps={
                { readOnly: true, }
            }
          />
          <TextField
            label="Change Responder Name"
            value={name_}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <InputLabel id="Change-Category">Change Category</InputLabel>
          <Select
            labelId="Select-Category"
            label="Category"
            value={category_}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem value={category} key={category}>{category}</MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={updateRecord}
          >
            Update Responder
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteRecord}
          >
            Delete Responder
          </Button>
        </Stack>
      </Container>
    );
  }
  
  export default ViewResponder;