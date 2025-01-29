import React, { useState } from 'react';
import ResultTable from './components/ResultTable';

const App = () => {
  const [studentData, setStudentData] = useState(null);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/api/students/2');
    const data = await response.json();
    setStudentData(data);
  };

  return (
    <div className="App">
      <button onClick={fetchData}>Fetch Result</button>
      {studentData ? <ResultTable data={studentData} /> : <p>Click the button to load results</p>}
    </div>
  );
};

export default App;
