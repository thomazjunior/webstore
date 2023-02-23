import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const FilterContext = createContext(undefined);
const FilterDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    filterName: ""
  });

  return (
    <FilterContext.Provider value={filters}>
      <FilterDispatchContext.Provider value={setFilters}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext, FilterDispatchContext };