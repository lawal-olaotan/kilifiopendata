
import React from 'react';
import './css/styles.min.css';
import DataTable from './components/DataTable'
import NavBar from './components/Navbar';
import { FilterProvider } from './FilterContext';

function App() {



  return (

    <FilterProvider>
      <NavBar/>
      <DataTable/>
      </FilterProvider>

   
  );
}

export default App;
