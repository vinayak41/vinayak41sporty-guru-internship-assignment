import React from "react";
import "./loader.css"

const Loader = () => {
  return (
    <div class="svg-loader">
      <svg class="svg-container" height="100" width="100" viewBox="0 0 100 100">
        <circle class="loader-svg bg" cx="50" cy="50" r="45"></circle>
        <circle class="loader-svg animate" cx="50" cy="50" r="45"></circle>
      </svg>
    </div>
  );
};

export default Loader;
