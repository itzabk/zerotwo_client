//START IMPORTS
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
  Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
//STOP IMPORTS

const GetSignups = () => {
  //configure date picker
  const [startVal, setStartVal] = useState(new Date());
  const [endVal, setEndVal] = useState(new Date());

  return (
    <Card>
      <CardHeader
        title="User Registrations Analysis"
        sx={{ textAlign: "center" }}
      />
      <Container>
        <Box>
          <CardContent></CardContent>
        </Box>
        <Box>
          <CardActions sx= {{display:'flex',justifyContent:'center'}}>
            <span >
              <DateTimePicker
                value={startVal}
                onChange={(newValue) => setStartVal(newValue)}
                maxDateTime={new Date()}
              />
              <DateTimePicker
                value={endVal}
                onChange={(newValue) => setEndVal(newValue)}
                maxDateTime={new Date()}
              />
            </span>
          </CardActions>
        </Box>
      </Container>
    </Card>
  );
};

export default GetSignups;
