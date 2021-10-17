import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [awsTips, setAwsTips] = React.useState(null);
  const [movies, setMovies] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/awstips")
      .then((res) => res.json())
      .then((data) => setAwsTips(data.tip));
  }, []);

  React.useEffect(() => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <p>{!awsTips ? "Loading..." : awsTips}</p>
        <p>
          <ul>
            {!movies
              ? "Loading..."
              : movies.map((movie) => {
                  return <li key={movie.title}>{movie.title}</li>;
                })}
          </ul>
        </p>
      </header>
    </div>
  );
}

export default App;
