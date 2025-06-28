
import './App.css'

import React, { useState } from 'react';

const App = () => 
  {
  const [count, setcount] = useState(0); 
  const increment = () => {
    setcount(count + 1);
  }
  const decrement = () => { 
    setcount(count - 1);
  }
  return (
    <div className="App">
      <h1>
        Counter:{count} </h1>
      <button onClick={increment}>  Increment  </button>
      <button onClick={decrement}> DEcrement  </button>
      <button onClick={() => setcount(0)}>Reset</button>
    </div>
  )
};

export default App;

