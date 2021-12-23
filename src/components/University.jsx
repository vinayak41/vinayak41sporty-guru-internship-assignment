import React from "react";
import { convertToSlug } from "../utils/helper";
import { useParams } from "react-router-dom";
import "./university.css";

const University = ({ universitiesList }) => {
  const { university_id } = useParams();
  const universityData = universitiesList?.find(
    (university) => convertToSlug(university.name) === university_id
  );
  console.log(universitiesList);
  console.log(universityData);
  return (
    <div className="university-container">
      {universityData ? (
        <div>
          <h1 className="university-name">{universityData.name}</h1>
          <div className="university-details" >
            <h3>
              Country: <span>{universityData.country}</span>
            </h3>
            <h3>
              State-Province:
              <span>{universityData["state-province"] || "not available"}</span>
            </h3>
            <h3>
              Web Pages:
              <a href={universityData.web_pages} target="_blank">
                {universityData.web_pages}
              </a>
            </h3>
          </div>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default University;
