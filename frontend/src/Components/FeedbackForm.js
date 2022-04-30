import { Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { STUDENT } from "../App";
import { Stack, RadioGroup, FormControlLabel, Radio, Rating, Button } from "@mui/material";
import { FormLabel } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm(props) {
  const incident = props.incident;
  const toast = props.toast;
  const userType = props.userType;
  const backendURL = props.backendURL;
  
  const [resolved, setResolved] = useState(true);
  const [act_rating, setActRating] = useState(3);
  const [respTime_rating, setRespTimeRating] = useState(3);
  const [comments, setComments] = useState('');
  const [disabled, setDisabled] = useState(true);
  console.log('feed', incident.feedback); 
  let navigate = useNavigate();

  useEffect(() => {
    if (incident.feedback) {
      setResolved(incident.feedback.resolved);
      setActRating(incident.feedback.act_rating);
      setRespTimeRating(incident.feedback.respTime_rating);
      setComments(incident.feedback.comments);
    }
      setDisabled(incident.feedback ? true : false);
  }, [incident.feedback]);

  if (!incident.resolved && !incident.feedback ||
    incident.resolved && !incident.feedback && userType != STUDENT) {
      console.log(incident.resolved)
      console.log(userType)
    return null; // No feedback nothing for never resolved issue.
  }
  const submitFeedback = (e) => {
    fetch(`${backendURL}/updateincident`, {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "_id": incident._id.$oid,
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
        navigate("/view-incidents");
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
          <FormControlLabel value={true} control={<Radio disabled={disabled}/>} label="Yes" />
          <FormControlLabel value={false} control={<Radio disabled={disabled}/>} label="No" />
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
      <br></br><br></br>
    </Container>
  );
}