
import React from 'react';
import DataTable from './components/DataTable'
import NavBar from './components/Navbar';
import Project from './components/Project';
import { FilterProvider } from './FilterContext';

function App() {



  return (
    <div className="container">
      
      <FilterProvider>
        <NavBar/>
        <DataTable/>
        <Project/>
        </FilterProvider>
      </div>
   
  );
}

export default App;
