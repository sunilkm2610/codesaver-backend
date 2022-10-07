import React, { useEffect, useState } from "react";

import { LinearProgress } from "@mui/material";

// import { useNavigate } from "react-router-dom";
import SolutionCard from "./SolutionCard";

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [open, setOpen] = useState(0);
  // const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      setOpen(true);
      await fetch(`http://localhost:4000/api/solution`)
        .then((res) => res.json())
        .then((data) => {
          data.solutions.reverse();
          setSolutions(data.solutions);
        })
        .catch((err) => console.log(err));
      setOpen(false);
    };
    getData();
  }, []);
  return (
    <div style={{ background: "white" }}>
      {open ? (
        <LinearProgress />
      ) : (
        solutions.map((solution) => (
          <div key={solution._id} style={{ padding: "30px" }}>
            <SolutionCard data={solution} />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Solutions;
