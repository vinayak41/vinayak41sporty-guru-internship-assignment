import React from "react";
import { Link } from "react-router-dom";
import { convertToSlug } from "../utils/helper";
import "./home.css";

const Home = ({
  universitiesList,
  filter,
  setFilter,
  filteredUniversityList,
}) => {
  let states = universitiesList?.map(
    (universitie) => universitie["state-province"]
  );
  states = [...Array.from(new Set(states))];
  states = states.filter((state) => Boolean(state));
  states.push("Other");
  states = ["all"].concat(states);

  const handleSearch = (e) => {
    setFilter((prevState) => ({ ...prevState, searchTerm: e.target.value }));
  };

  const handleSort = (sortValue) => {
    setFilter((prevState) => ({ ...prevState, sortValue }));
  };

  const handleStateChange = (stateName) => {
    setFilter((prevState) => ({ ...prevState, stateName }));
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Universities in India</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={filter.searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="sort">
          sort by:
          <div className="sort-btn" onClick={() => handleSort("a-z")}>
            a-z
          </div>
          <div className="sort-btn" onClick={() => handleSort("z-a")}>
            z-a
          </div>
        </div>
      </div>

      <div className="content">
        <div className="universities">
          <h3 className="university-header">Universities</h3>
          {filteredUniversityList ? (
            filteredUniversityList.map((universitie, index) => (
              <h3 className="university" key={index}>
                <Link to={`/${convertToSlug(universitie.name)}`}>
                  {universitie.name}
                </Link>
              </h3>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className="state-container">
          <div className="states">
            <h3 className="state-header">State province</h3>
            {states?.map((state, index) => (
              <p
                key={index}
                className="state"
                onClick={() => handleStateChange(state || "Other")}
                style={
                  filter.stateName === state ||
                  (!filter.stateName && state === "all")
                    ? { border: "1px solid gray", backgroundColor: "white" }
                    : null
                }
              >
                {state ? state : "Other"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
