import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "./Home";

import "./Styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const { searchValue, setSearchValue, setResponse } =
    useContext(SearchContext);

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

  return (
    <div id="navbar">
      <div>Logo</div>
      <div>
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
            id="searchBox"
          />
        </form>
      </div>
      <div id="navItems">
        <Link to={"/home"} id="links">
          Home
        </Link>
        <Link to={"/download"} id="links">
          Download
        </Link>
        <Link id="links">Account</Link>
      </div>
    </div>
  );
}

export default Navbar;
