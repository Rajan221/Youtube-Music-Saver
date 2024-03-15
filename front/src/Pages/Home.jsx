import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/Home.css";

import VideoCard from "./Components/VideoCard";
import musicSvg from "../logos/music.svg";
import Navbar from "./Navbar";

function Home() {
  const [url, setUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState([]);
  const [mostPlayedResponse, setMostPlayedResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/", { url });

      if (response.status === 201) {
        alert("Music Added Successfully");
        fetchData();
        setUrl("");
      } else if (
        response.status === 200 &&
        response.data.message === "Video already added"
      ) {
        alert("Video already added");
        setUrl("");
      } else {
        alert("An error occurred while adding the video");
      }
    } catch (error) {
      console.error("Error fetching link preview:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseData = await axios.get("http://localhost:5000/");
      const mostPlayed = await axios.get("http://localhost:5000/mostPlayed");

      setMostPlayedResponse(mostPlayed.data);
      setResponse(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    console.log("Deleted");
    fetchData();
  };

  const onSearch = async (value) => {
    setSearchValue(value);
    try {
      const responseData = await axios.get("http://localhost:5000/");
      const filteredData = responseData.data.filter(
        (data) =>
          data.videoTitle.toLowerCase().includes(value.toLowerCase()) ||
          data.videoLink.toLowerCase().includes(value.toLowerCase())
      );
      setResponse(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error("Error reading from clipboard:", error);
    }
  };

  useEffect(() => {
    document.title = "Home";
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <img id="music" src={musicSvg} alt="musicSvg" />
      <img id="musicCpy" src={musicSvg} alt="musicSvg" />
      <>
        <div id="topHeadLine" className="headLine">
          <span id="highlight">Never Loose Access </span>
        </div>
        <div className="headLine">
          <span id="highlightInverted"> To Your Music, Shorts, Links </span>
        </div>
      </>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add the Music Links"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          id="paste"
          onClick={() => {
            handlePaste();
          }}
        >
          Paste
        </button>
        <button type="submit">Add to List</button>
      </form>
      <br />

      {/* Search form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder="Search music here"
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </form>

      {searchValue ? (
        <>
          <h1 id="recentHead">Search Results ({response.length}):</h1>
          <div id="cards">
            {response.map((data) => (
              <React.Fragment key={data._id}>
                <VideoCard
                  id={data._id}
                  link={data.videoLink}
                  image={data.videoImage}
                  title={data.videoTitle}
                  onDelete={onDelete}
                />
              </React.Fragment>
            ))}
          </div>{" "}
        </>
      ) : (
        <>
          {/* most played  */}

          <h1 id="recentHead">Most Played ({mostPlayedResponse.length}):</h1>
          <div id="cardsMostPlayed">
            {mostPlayedResponse.map((data) => (
              <React.Fragment key={data._id}>
                <VideoCard
                  id={data._id}
                  link={data.videoLink}
                  image={data.videoImage}
                  title={data.videoTitle}
                  onDelete={onDelete}
                />
              </React.Fragment>
            ))}
          </div>

          {loading && <h1>Loading...</h1>}

          {/* recently added section */}
          <h1 id="recentHead">Recently added ({response.length}):</h1>
          <div id="cards">
            {response.map((data) => (
              <React.Fragment key={data._id}>
                <VideoCard
                  id={data._id}
                  link={data.videoLink}
                  image={data.videoImage}
                  title={data.videoTitle}
                  onDelete={onDelete}
                />
              </React.Fragment>
            ))}
          </div>
          {loading && <h1>Loading...</h1>}
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default Home;
