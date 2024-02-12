import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
    console.log("s", searchParams.get("sortBy"));
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={sortBy}
      type="white"
    ></Select>
  );
}
