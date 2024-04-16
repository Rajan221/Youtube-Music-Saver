import React, { useContext, useState } from "react";
import axios from "axios";
import { SearchContext } from "./Home";

import "./Styles/Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "./Components/Dropdown";

function Navbar() {
  const { searchValue, setSearchValue, setResponse } =
    useContext(SearchContext);
  const [dropdown, setDropdown] = useState(false);

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
      <div id="logoDiv">Logo</div>
      <div id="searchDiv">
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
        <Link
          id="links"
          onClick={() => {
            dropdown ? setDropdown(false) : setDropdown(true);
          }}
        >
          Account
        </Link>
        {dropdown ? <Dropdown /> : ""}
      </div>
    </div>
  );
}

export default Navbar;
