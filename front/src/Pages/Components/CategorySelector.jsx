import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../Styles/CategorySelector.css";

function CategorySelector(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Music");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Perform any additional tasks based on the selected option if needed
  };

  return (
    <div className="custom-select-container">
      <div className="custom-select" onClick={toggleDropdown}>
        <div className="selected-option">
          {selectedOption || "Select an option"}{" "}
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {isOpen && (
        <div className="options">
          {props.options.map((option, index) => (
            <div
              className="option"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
