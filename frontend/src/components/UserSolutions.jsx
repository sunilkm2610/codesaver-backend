import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const UserSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [del, setDel] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      let userId = window.localStorage.getItem("userId");
      await fetch(`http://localhost:4000/api/solution/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.user.solutions);
          setSolutions(data.user.solutions);
          setDel(false);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [del]);

  const deleteSolution = async (id) => {
    await fetch(`http://localhost:4000/api/solution/${id}`, {
      method: "DELETE",
    });
    setDel(true);
  };
  const editSolution = async (id) => {
    // await fetch(`http://localhost:4000/api/solution/update/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({}),
    // });
    navigate(`/my-solutions/${id}`);
  };

  return (
    <>
      {solutions.map((solution) => (
        <Box key={solution._id} style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>{`${solution.title} | ${solution.topic} | ${solution._id}`}</Typography>
              <Box>
                <Tooltip title="Delete">
                  <IconButton onClick={() => deleteSolution(solution._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton onClick={() => editSolution(solution._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CodeMirror
                value={solution.code}
                height="auto"
                theme="dark"
                extensions={[javascript({ jsx: true })]}
                autoFocus="true"
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </>
  );
};

export default UserSolutions;
