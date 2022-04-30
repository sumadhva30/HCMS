import { Button, Container, MenuItem, Select, TextField, Stack, InputLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory(props) {
  const backendURL = props.backendURL;
  const toast = props.toast;
  let navigate = useNavigate();
  const [category_, setCategory] = useState('');

  const addRecord = (e) => {
      console.log(JSON.stringify({cat_name: category_}));
    fetch(`${backendURL}/admin/insertCategoryInfo`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({cat_name: category_})
    }).then((res) => {
      if (res.ok) {
        toast("success", "Category Added!");
        navigate("/view-categories");
      }
    });
  };
  return (
    <Container>
      <Stack spacing={2}>
        <TextField
          label="Enter New Category"
          value={category_}
          onChange={(e)=>{setCategory(e.target.value)}}
        />
        <Button
          variant="contained"
          onClick={addRecord}
        >
          Add Category
        </Button>
      </Stack>
    </Container>
  );
}

export default AddCategory;