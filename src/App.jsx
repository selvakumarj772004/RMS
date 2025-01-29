import "./App.css";
import React, { useState } from "react";

function App() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      setError("Invalid CAPTCHA. Please try again.");
      setGeneratedCaptcha(generateCaptcha());
      setCaptcha("");
      return;
    }

    fetch(`http://localhost:8080/api/students/${registerNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Register Number Not Found");
        }
        return response.json();
      })
      .then((data) => {
        setStudentData(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setStudentData(null);
      });
  };

  return (
    <div className="container">
      {!studentData ? (
        <div className="login-form">
          <h2>Student Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Register Number</label>
              <input
                type="text"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Enter the CAPTCHA</label>
              <div className="captcha">
                <span>{generatedCaptcha}</span>
                <button
                  type="button"
                  onClick={() => setGeneratedCaptcha(generateCaptcha())}
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="result-container">
          <h1>ANNA UNIVERSITY APRIL / MAY RESULT</h1>

          <div className="info">
            <table id="student-table">
              <tr>
                <td>
                  <span>Register Number:</span>
                </td>
                <td>{studentData.id}</td>
              </tr>
              <tr>
                <td>
                  <span>Name:</span>
                </td>
                <td>{studentData.name}</td>
              </tr>
              <tr>
                <td>
                  <span>Branch:</span>
                </td>
                <td>B.Tech. Information Technology</td>
              </tr>
            </table>
          </div>
          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Marks</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(studentData)
                .filter((key) => key.startsWith("it"))
                .map((subjectCode) => {
                  const marks = studentData[subjectCode];
                  const isPass = marks > 44;
                  return (
                    <tr key={subjectCode}>
                      <td>01</td>
                      <td>{subjectCode.toUpperCase()}</td>
                      <td>{marks}</td>
                      <td
                        style={{
                          color: isPass ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {isPass ? "Pass" : "Fail"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button
  onClick={() => {
    setStudentData(null);
    setRegisterNumber("");
    setCaptcha("");
    setGeneratedCaptcha(generateCaptcha());
    setError("");
  }}
>
  Back
</button>
        </div>
      )}
    </div>
  );
}

export default App;
