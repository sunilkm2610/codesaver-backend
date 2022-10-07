import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Editor from "./Editor";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SolutionCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "70vw", margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.user.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${data.user.name} | ${
          data.title === "" ? "No title found" : data.title
        }`}
        subheader={data.updatedAt}
      />
      <Editor value={data.code} height={"500px"} readOnly={true} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.topic}
        </Typography>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>{data.language}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ minWidth: "150px" }}>
                  Web Solution URL
                </TableCell>
                <TableCell>
                  <a
                    style={{ color: "white" }}
                    href={data.webURL}
                    target="_blank"
                  >
                    {data.webURL}
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Youtube Solution URL</TableCell>

                <TableCell>
                  <a
                    style={{ color: "white" }}
                    href={data.youtubeURL}
                    target="_blank"
                  >
                    {data.youtubeURL}
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time complexity</TableCell>
                <TableCell>{data.timeC}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Space complexity</TableCell>
                <TableCell>{data.spaceC}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description or hint</TableCell>
                <TableCell>{data.hint}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Collapse>
    </Card>
  );
}
