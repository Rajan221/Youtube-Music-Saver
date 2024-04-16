import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import "./Styles/Home.css";

//components imports
import VideoCard from "./Components/VideoCard";
import musicSvg from "../logos/music.svg";
import Navbar from "./Navbar";
import CategorySelector from "./Components/CategorySelector";

// shadcn
import { Toaster, toast } from "sonner";

//search context for navbar
export const SearchContext = createContext({
  searchValue: "",

  setSearchValue: () => {},
  setResponse: () => {},
});

//actual home component
function Home() {
  const [url, setUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState([]);
  const [mostPlayedResponse, setMostPlayedResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pasteClicked, setPasteClicked] = useState(false);
  const [category, setCategory] = useState("Music");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log();
      const response = await axios.post("http://localhost:5000/", { url });

      console.log("Response message:", response.data.message); // Log the response message

      if (response.status === 201) {
        toast("Music Added Successfully", {
          cancel: {
            label: "X",
          },
        });
        fetchData();
        setUrl("");
      } else if (
        response.status === 200 &&
        response.data.message === "Video already added"
      ) {
        toast("Video already added into the list", {
          cancel: {
            label: "X",
          },
        });
        setUrl("");
      } else {
        toast("An error occurred while adding the video", {
          cancel: {
            label: "X",
          },
        });
      }
    } catch (error) {
      if (!pasteClicked) {
        toast("Insert a Valid Link", {
          cancel: {
            label: "X",
          },
        });

        console.error("Error fetching link preview:", error);
      }
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
    toast("Deleted Successfully", {
      cancel: {
        label: "X",
      },
    });
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
      toast("Error Fetching Data", {
        cancel: {
          label: "X",
        },
      });
    }
  };

  const handlePaste = async () => {
    try {
      setPasteClicked(true);
      const text = await navigator.clipboard.readText();

      setUrl(text);
    } catch (error) {
      console.error("Error reading from clipboard:", error);
      toast("Error Reading Value from Clipboard", {
        cancel: {
          label: "X",
        },
      });
    }
  };

  useEffect(() => {
    document.title = "Home";
    fetchData();
  }, []);

  useEffect(() => {
    // Reset paste clicked state after a delay
    const timeout = setTimeout(() => {
      setPasteClicked(false);
    }, 1); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  }, [url]);

  return (
    <>
      <SearchContext.Provider
        value={{ searchValue, setSearchValue, setResponse }}
      >
        <Navbar />
      </SearchContext.Provider>
      <Toaster theme="system" />

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

        <select
          name="category"
          id="categorySelector"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Music">Music</option>
          <option value="Anime">Anime</option>
          <option value="Others">Others</option>
        </select>
        <button
          id="paste"
          onClick={() => {
            handlePaste();
          }}
        >
          Paste
        </button>
        <button type="submit">Add to List</button>

        <button
          id="clear"
          onClick={(e) => {
            e.preventDefault();
            setUrl("");
          }}
        >
          Clear All
        </button>
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
