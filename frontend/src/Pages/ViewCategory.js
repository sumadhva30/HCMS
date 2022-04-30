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

function ViewCategory(props) {
  const location = useLocation()
  const { category } = location.state
  const toast = props.toast;

    const userType = ADMIN
    let navigate = useNavigate();
    const [category_, setCategory] = useState('');
    const backendURL = "http://localhost:8000"; 

    
    const updateRecord = (e) => {
      fetch(`${backendURL}/admin/updateCategoryInfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          old_name: category,
          new_name: category_
        })
      }).then((res) => {
        if (res.ok) {
          toast("success", "Category Updated!");
          navigate("/view-categories");
        }
      });
    };

    const deleteRecord = (e) => {
      fetch(`${backendURL}/admin/delCategoryInfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({cat_name: category})
      }).then((res) => {
        if (res.ok) {
          toast("success", "Category Deleted!");
          navigate("/view-categories");
        }
      });
    };

    return (
      <Container>
        <Stack spacing={2}>
          <TextField
            label="Category Name"
            defaultValue={category}
            variant="outlined"
            inputProps={
                { readOnly: true, }
            }
          />
          <TextField
            label="Change Category Name"
            value={category_}
            onChange={(e)=>{setCategory(e.target.value)}}
          />
          <Button
            variant="contained"
            onClick={updateRecord}
          >
            Update Category
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteRecord}
          >
            Delete Category
          </Button>
        </Stack>
      </Container>
    );
  }
  
  export default ViewCategory;