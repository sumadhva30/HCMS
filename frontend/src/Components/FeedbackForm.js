import { Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { STUDENT } from "../App";

export default function FeedbackForm(props) {
  const incident = props.incident;
  const toast = props.toast;
  const userType = props.userType;
  const backendURL = props.backendURL;
  
  const [resolved, setResolved] = useState(true);
  const [act_rating, setActRating] = useState(3);
  const [respTime_rating, setRespTimeRating] = useState(3);
  const [comments, setComments] = useState('');

  if (!incident.resolved && !incident.feedback ||
    incident.resolved && !incident.feedback && userType != STUDENT) {
    return null; // No feedback nothing for never resolved issue.
  }
  const disabled = incident.feedback ? true : false;
  const submitFeedback = (e) => {
    fetch(`${backendURL}/updateincident`, {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "_id": incident["_id"],
        "feedback": {
          resolved: resolved,
          act_rating: act_rating,
          respTime_rating: respTime_rating,
          comments: comments
        }
      })
    }).then((res) => {
      if (res.ok) {
        toast("success", "Feedback Submitted!");
      }
    })
  };

  return (
    <Container>
      <Stack spacing={2}>
        <FormLabel id="feedback-resolved-radio-buttons-group">Was your Complaint resolved ?</FormLabel>
        <RadioGroup
          row
          aria-labelledby="feedback-resolved-radio-buttons-group"
          value={resolved}
          onChange={(e) => setResolved(e.target.value)}
          name="radio-buttons-group"
          disabled={disabled}
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
        <Typography component="legend">How would you rate the actions taken / response provided?</Typography>
        <Rating disabled={disabled} value={act_rating} onChange={(e, nv) => setActRating(nv)} />
        <Typography component="legend">How would you rate the response times?</Typography>
        <Rating disabled={disabled} value={respTime_rating} onChange={(e, nv) => setRespTimeRating(nv)} />
        <TextField
          label="Comments"
          value={comments}
          onChange={(e)=>{setComments(e.target.value)}}
          multiline
          disabled = {disabled}
        />
        {disabled ? null : <Button
          variant="contained"
          onClick={submitFeedback}
        >
          Submit Feedback
        </Button>}
      </Stack>
    </Container>
  );
}