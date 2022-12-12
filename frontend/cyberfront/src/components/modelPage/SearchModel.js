import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

function SearchModel(props) {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
    };
  
  return (
    <div>
      <TextField type="text" placeholder='Search' onChange={props.handleSearch}/>
    </div>
  )
}

export default SearchModel
