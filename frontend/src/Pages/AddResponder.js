import { Button, Container, MenuItem, Select, TextField, Stack, InputLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddResponder(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const toast = props.toast;
  let navigate = useNavigate();
  const [category_, setCategory] = useState('');
  const [name_, setName] = useState('');
  const [id_, setID] = useState('');
  

  const addRecord = (e) => {
      console.log(JSON.stringify({
        _id: id_,
        name: name_,
        category: [category_]
      }));
    fetch(`${backendURL}/admin/insertResponderInfo`, {
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
        toast("success", "Responder Added!");
        navigate("/view-responders");
      }
    });
  };
  return (
    <Container>
      <Stack spacing={2}>
        <TextField
          label="Enter Responder ID"
          value={id_}
          onChange={(e)=>{setID(e.target.value)}}
        />
        <TextField
          label="Enter Responder Name"
          value={name_}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <InputLabel id="Select-Category">Category</InputLabel>
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
          onClick={addRecord}
        >
          Add Responder
        </Button>
      </Stack>
    </Container>
  );
}

export default AddResponder;