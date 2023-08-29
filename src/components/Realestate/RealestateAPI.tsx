import React, { useEffect, useState } from "react";

const usaStates = [
  { name: "Alabama", shortName: "AL" },
  { name: "Alaska", shortName: "AK" },
  { name: "Arkansas", shortName: "AR" },
  { name: "Arizona", shortName: "AZ" },
  { name: "California", shortName: "CA" },
  { name: "Colorado", shortName: "CO" },
  { name: "Connecticut", shortName: "CT" },
  { name: "Delaware", shortName: "DE" },
  { name: "District of Columbia", shortName: "DC" },
  { name: "Florida", shortName: "FL" },
  { name: "Georgia", shortName: "GA" },
  { name: "Hawaii", shortName: "HI" },
  { name: "Idaho", shortName: "ID" },
  { name: "Illinois", shortName: "IL" },
  { name: "Indiana", shortName: "IN" },
  { name: "Iowa", shortName: "IA" },
  { name: "Kansas", shortName: "KS" },
  { name: "Kentucky", shortName: "KY" },
  { name: "Louisiana", shortName: "LA" },
  { name: "Maine", shortName: "ME" },
  { name: "Maryland", shortName: "MD" },
  { name: "Massachusetts", shortName: "MA" },
  { name: "Michigan", shortName: "MI" },
  { name: "Minnesota", shortName: "MN" },
  { name: "Mississippi", shortName: "MS" },
  { name: "Missouri", shortName: "MO" },
  { name: "Montana", shortName: "MT" },
  { name: "Nebraska", shortName: "NE" },
  { name: "Nevada", shortName: "NV" },
  { name: "New Hampshire", shortName: "NH" },
  { name: "New Jersey", shortName: "NJ" },
  { name: "New Mexico", shortName: "NM" },
  { name: "New York", shortName: "NY" },
  { name: "North Carolina", shortName: "NC" },
  { name: "North Dakota", shortName: "ND" },
  { name: "Ohio", shortName: "OH" },
  { name: "Oklahoma", shortName: "OK" },
  { name: "Oregon", shortName: "OR" },
  { name: "Pennsylvania", shortName: "PA" },
  { name: "Rhode Island", shortName: "RI" },
  { name: "South Carolina", shortName: "SC" },
  { name: "South Dakota", shortName: "SD" },
  { name: "Tennessee", shortName: "TN" },
  { name: "Texas", shortName: "TX" },
  { name: "Utah", shortName: "UT" },
  { name: "Vermont", shortName: "VT" },
  { name: "Virginia", shortName: "VA" },
  { name: "Washington", shortName: "WA" },
  { name: "West Virginia", shortName: "WV" },
  { name: "Wisconsin", shortName: "WI" },
  { name: "Wyoming", shortName: "WY" },
];

export const RealestateComponent = () => {
  const sources = ["traditional", "airbnb"];
  const [source, setSource] = useState("airbnb");
  const [country, setCountry] = useState({ name: "New York", shortName: "NY" });
  const [realestateData, setRealestateData] = useState("");

  const url = `https://mashvisor-api.p.rapidapi.com/rental-rates?state=${country.shortName}&source=${source}&city=NY`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db49712ec6msh719067c9f28ef7bp144e10jsnc9316de9fb79",
      "X-RapidAPI-Host": "mashvisor-api.p.rapidapi.com",
    },
  };
  useEffect(() => {
    const getRealEstateData = async () => {
      try {
        const result = await fetch(url, options).then((res) => res.text());
        console.log(result);
        setRealestateData(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    };
    getRealEstateData();
  }, [country, source]);

  return (
    <>
      {" "}
      <h2>{country.name}</h2>
      <select
        placeholder="Select different state.."
        onChange={(e) =>
          setCountry({ name: e.target.value, shortName: e.target.value })
        }
      >
        <option value={""}>--- Select a State ---</option>
        {usaStates.map((state, index) => (
          <option key={index} value={state.shortName}>
            {state.name}
          </option>
        ))}
      </select>
      <h2>{source}</h2>
      <select
        placeholder="Select source"
        onChange={(e) => setSource(e.target.value)}
      >
        <option value={""}>--- Select a source ---</option>
        {sources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>
      {realestateData}
      <div></div>
    </>
  );
};
