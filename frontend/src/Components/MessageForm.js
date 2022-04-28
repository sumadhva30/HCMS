import { TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";

export default function MessageForm(props) {
  const message = props.message;
  const setMessage = props.setMessage;
  const files = React.createRef(); // apparently file inputs can not be controlled with props like TextField value.


  const [value, setValue] = useState('');
  return (
    <Container>
      <TextField
        label={messageLabel}
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        multiline
      />
      <label htmlFor="upload-button-file">
        <Input id="upload-button-file" multiple type="file" ref={files} />
        <Button variant="contained" component="div" startIcon={<UploadFileIcon />}>
          Attachments
        </Button>
      </label>
    </Container>
  );
}