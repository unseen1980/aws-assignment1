import React from "react";
import "./App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [awsTips, setAwsTips] = React.useState(null);
  const [movies, setMovies] = React.useState(null);
  const [instance, setInstance] = React.useState(null);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_LB + "/awstips")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("---->", data);
        setAwsTips(data.message.tip);
      });
  }, []);

  React.useEffect(() => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  React.useEffect(() => {
    fetch("/instance")
      .then((res) => res.json())
      .then((data) => setInstance(data));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ backgroundColor: "#E8E4C7" }}>
        <Grid item xs={12} style={{ backgroundColor: "#242645" }}>
          <Item style={{ backgroundColor: "#242645", color: "#fff" }}>
            <h2>AWS Assignment 1 - C.Koutsiaris</h2>
          </Item>
        </Grid>
        {instance ? (
          <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={2}>
              <Item style={{ backgroundColor: "#456A50", color: "#fff" }}>
                <h3>Data from MetadataService:</h3>
              </Item>
            </Grid>
            <Grid item xs={10}>
              <Item style={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {!instance ? "" : instance}
                </Typography>
              </Item>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Grid item xs={2}>
            <Item style={{ backgroundColor: "#456A50", color: "#fff" }}>
              <h3>Data from Lambda:</h3>
            </Item>
          </Grid>
          <Grid item xs={10}>
            <Item style={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div">
                {!awsTips ? "Loading..." : awsTips}
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Grid item xs={2}>
            <Item style={{ backgroundColor: "#456A50", color: "#fff" }}>
              <h3>Data from DynamoDB:</h3>
            </Item>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              {!movies
                ? "Loading..."
                : movies.map((movie) => {
                    if (movie.info.plot !== undefined) {
                      return (
                        <Grid item xs={4} key={movie.title}>
                          <Item
                            elevation="0"
                            style={{
                              backgroundColor: "#E8E4C7",
                              paddingTop: 0,
                              paddingLeft: 0,
                            }}
                          >
                            <Card sx={{ maxWidth: 345, minHeight: 200 }}>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {movie.title}
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  sx={{
                                    fontSize: "default",
                                    fontWeight: "light",
                                    fontStyle: "oblique",
                                  }}
                                >
                                  {movie.year} - {movie.info.genres[0]}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {movie.info.plot}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Item>
                        </Grid>
                      );
                    } else {
                      return <div> </div>;
                    }
                  })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
