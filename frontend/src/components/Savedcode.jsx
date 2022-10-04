import React from "react";
import {
  Box,
  ListItem,
  List,
  TextField,
  Typography,
  Autocomplete,
  TextareaAutosize,
  Button,
} from "@mui/material";
import axios from "axios";
import { solutionContext } from "../contexts/ContextApi";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Savedcode() {
  const navigate = useNavigate();
  const options = ["Array", "Linked List"];
  const complexity = [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n logn)",
    "O(n^2)",
    "O(2^n)",
    "O(n!)",
  ];
  const language = ["C++", "JavaScript", "C", "Python"];
  const style = {
    "add-solution": {
      background: "#385170",
      width: "300px",
      color: "#ececec",
      "&:hover": {
        background: "#142d4c",
      },
    },
  };
  const { solutionData, setSolutionData } = useContext(solutionContext);
  useEffect(() => {
    setSolutionData({
      user: "",
      code: "",
      title: "",
      language: "",
      webURL: "",
      youtubeURL: "",
      topic: "",
      timeC: "",
      spaceC: "",
      hint: "",
    });
  }, []);
  const handleChange = (e) => {
    setSolutionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const saveFormData = (e) => {
    console.log(solutionData);
    try {
      axios
        .post("http://localhost:4000/api/solution/add", {
          user: window.localStorage.getItem("userId"),
          code: solutionData.code,
          title: solutionData.title,
          language: solutionData.language,
          webURL: solutionData.webURL,
          youtubeURL: solutionData.youtubeURL,
          topic: solutionData.topic,
          timeC: solutionData.timeC,
          spaceC: solutionData.spaceC,
          hint: solutionData.hint,
        })
        .then(function(response) {
          // console.log(response);
          navigate("/my-solutions");
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ background: "black" }}>
      <List spacing={2}>
        <ListItem item="true">
          <Typography>Add Question</Typography>
        </ListItem>
        <ListItem item="true">
          <TextField
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            value={solutionData.title}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem item="true">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={language}
            value={solutionData.language}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option === value
            }
            sx={{ width: 300 }}
            size="small"
            onChange={(e, v) =>
              setSolutionData({ ...solutionData, language: v })
            }
            renderInput={(params) => <TextField {...params} label="Language" />}
          />
        </ListItem>
        <ListItem item="true">
          <TextField
            id="outlined-basic"
            label="Web Solution Url"
            variant="outlined"
            size="small"
            name="webURL"
            value={solutionData.webURL}
            onChange={handleChange}
            sx={{ width: 300 }}
          />
        </ListItem>
        <ListItem item="true">
          <TextField
            id="outlined-basic"
            label="Youtube Solution Url"
            variant="outlined"
            size="small"
            name="youtubeURL"
            value={solutionData.youtubeURL}
            onChange={handleChange}
            sx={{ width: 300 }}
          />
        </ListItem>
        <ListItem item="true">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={solutionData.topic}
            options={options}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option === value
            }
            sx={{ width: 300 }}
            size="small"
            onChange={(e, v) => setSolutionData({ ...solutionData, topic: v })}
            renderInput={(params) => <TextField {...params} label="Topic" />}
          />
        </ListItem>
        <ListItem item="true">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={complexity}
            sx={{ width: 300 }}
            size="small"
            value={solutionData.timeC}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option === value
            }
            onChange={(e, v) => setSolutionData({ ...solutionData, timeC: v })}
            renderInput={(params) => (
              <TextField {...params} label="Time Complexity" />
            )}
          />
        </ListItem>
        <ListItem item="true">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={complexity}
            sx={{ width: 300 }}
            size="small"
            value={solutionData.spaceC}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option === value
            }
            onChange={(e, v) => setSolutionData({ ...solutionData, spaceC: v })}
            renderInput={(params) => (
              <TextField {...params} label="Space Complexity" />
            )}
          />
        </ListItem>
        <ListItem item="true">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description Or Hint"
            name="hint"
            value={solutionData.hint}
            onChange={handleChange}
            style={{ width: 295 }}
          />
        </ListItem>
        <ListItem item="true">
          <Button onClick={saveFormData} sx={style["add-solution"]}>
            ADD SOLUTION
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}

export default Savedcode;
