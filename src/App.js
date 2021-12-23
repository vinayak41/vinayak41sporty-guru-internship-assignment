import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import University from "./components/University";
import "./app.css";
import Loader from "./components/Loader";

const App = () => {
  const [universitiesList, setUniversititesList] = useState(null);
  const [filter, setFilter] = useState({
    searchTerm: "",
    sortValue: null,
    stateName: "all",
  });
  const [filteredUniversityList, setFilteredUniversityList] = useState([]);

  const fetchUniversitiesData = async () => {
    const response = await fetch(
      "http://universities.hipolabs.com/search?country=India"
    );
    const responseJSON = await response.json();
    setUniversititesList(responseJSON.slice(0, responseJSON.length / 2));
  };

  console.log(filter);

  useEffect(() => {
    fetchUniversitiesData();
  }, []);

  const applySort = () => {
    let newList;
    newList = universitiesList?.filter((universitie) => {
      return (
        filter.searchTerm === "" ||
        universitie.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    });
    newList = newList?.sort((first, second) => {
      if (filter.sortValue === "z-a") {
        if (first.name < second.name) return 1;
        else if (first.name > second.name) return -1;
        else return 0;
      }
      if (filter.sortValue === "a-z") {
        if (first.name < second.name) return -1;
        else if (first.name > second.name) return 1;
        else return 0;
      }
      return 0;
    });
    if (filter.stateName && filter.stateName !== "all") {
      if (filter.stateName === "Other") {
        newList = newList?.filter(
          (universitie) => !universitie["state-province"]
        );
      } else {
        newList = newList?.filter(
          (universitie) => universitie["state-province"] === filter.stateName
        );
      }
    }
    setFilteredUniversityList(newList);
  };

  useEffect(() => {
    applySort();
  }, [filter]);

  useEffect(() => {
    if (universitiesList) {
      setFilteredUniversityList(universitiesList);
    }
  }, [universitiesList]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {universitiesList ? (
                  <Home
                    filter={filter}
                    setFilter={setFilter}
                    universitiesList={universitiesList}
                    filteredUniversityList={filteredUniversityList}
                  />
                ) : (
                  <Loader />
                )}
              </>
            }
            exact
          />

          <Route
            path="/:university_id"
            element={
              <>
                {universitiesList ? (
                  <University universitiesList={universitiesList} />
                ) : (
                  <Loader />
                )}
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
