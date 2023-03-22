import List from "@mui/material/List";
import * as React from "react";
import { useContext } from "react";
import {
  FilterContext,
  FilterDispatchContext
} from "../components/context/FiltersContext";
import SearchAppBar from "./Search";

export default function Sidebar() {


  const setFilters = useContext(FilterDispatchContext);
  const filters = React.useContext(FilterContext);

  const handleAlterFilterName = async (value) => {
    setFilters({
      filterName: value,
    });
  };

  return (
    <List
      component="nav"
      className="sidebar"
    >
      <SearchAppBar handleChange={handleAlterFilterName} />
    </List>
  );
}
