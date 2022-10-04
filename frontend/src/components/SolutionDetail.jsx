import React, { useEffect } from "react";
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
import { useContext } from "react";
import Editor from "./Editor";
import { useNavigate, useParams } from "react-router-dom";

function SolutionDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { solutionData, setSolutionData } = useContext(solutionContext);
  useEffect(() => {
    const getSolution = async () => {
      await fetch(`http://localhost:4000/api/solution/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSolutionData(data.solution);
        });
      // console.log(data);
    };
    getSolution();
  }, []);

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
  const handleChange = (e) => {
    setSolutionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const eidtFormData = async (e) => {
    await axios
      .put(`http://localhost:4000/api/solution/update/${id}`, {
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
      .then(() => navigate("/my-solutions"));
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", background: "black" }}>
      <div className="savedcode">
        <List spacing={3}>
          <ListItem item="true">
            <Typography color={"white"}>Add Question</Typography>
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
              sx={{ width: 300 }}
              size="small"
              value={solutionData.language}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value
              }
              onChange={(e, v) =>
                setSolutionData({ ...solutionData, language: v })
              }
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
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
              options={options}
              sx={{ width: 300 }}
              size="small"
              value={solutionData.topic}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value
              }
              onChange={(e, v) =>
                setSolutionData({ ...solutionData, topic: v })
              }
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
              onChange={(e, v) =>
                setSolutionData({ ...solutionData, timeC: v })
              }
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
              onChange={(e, v) =>
                setSolutionData({ ...solutionData, spaceC: v })
              }
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
            <Button onClick={eidtFormData} sx={style["add-solution"]}>
              EDIT SOLUTION
            </Button>
          </ListItem>
        </List>
      </div>
      <div className="editor">
        <Editor value={solutionData.code} className="editor" />
      </div>
    </Box>
  );
}

export default SolutionDetail;
