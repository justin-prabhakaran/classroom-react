import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  // Validate the "Reg No" input
  const validateRegNo = (value: string): boolean => {
    const regNoPattern = /^9537\d*$/;
    return regNoPattern.test(value);
  };

  // Validate the "Email" input
  const validateEmail = (value: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@aaacet\.ac\.in$/;
    return emailPattern.test(value);
  };

  // Handle form submission for the Student (Log in) form
  const handleStudentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isRegNoValid = validateRegNo(input);
    const isEmailValid = validateEmail(input);

    if (!isRegNoValid && !isEmailValid) {
      setInputError("Input must be a valid registration");
      return;
    }

    // Add your logic for handling the student login here
    console.log("Student form submitted");
  };

  // Handle form submission for the Teacher (Sign up) form
  const handleTeacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(input)) {
      setInputError("Email must be valid!");
      return;
    }

    // Add your logic for handling the teacher signup here
    console.log("Teacher form submitted");
  };

  // Handle change for the input box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, isStudent : boolean) => {
    const value = event.target.value;
    setInput(value);
    if(isStudent){
      if (validateRegNo(value) || validateEmail(value) || value === "") {
        setInputError("");
      } else {
        setInputError("Input must be a valid.");
      }
    }else{
      if (validateEmail(value) || value === "") {
        setInputError("");
      } else {
        setInputError("Input must be a valid.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {/* Student Form */}
            <div className="flip-card__front">
              <div className="title">Student</div>
              <form className="flip-card__form" onSubmit={handleStudentSubmit}>
                <input
                  className="flip-card__input"
                  name="input"
                  placeholder="Reg No / Email"
                  type="text"
                  value={input}
                  onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event,true);
                  }}
                  required
                />
                {inputError && (
                  <div style={{ color: "red", fontSize: "16px" }}>
                    {inputError}
                  </div>
                )}
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <button className="flip-card__btn" type="submit">
                  Submit
                </button>
              </form>
            </div>

            {/* Teacher Form */}
            <div className="flip-card__back">
              <div className="title">Teacher</div>
              <form className="flip-card__form" onSubmit={handleTeacherSubmit}>
                <input
                  className="flip-card__input"
                  name="input"
                  placeholder="Email"
                  type="email"
                  value={input}
                  onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event,false);
                  }}
                  required
                />
                {inputError && (
                  <div style={{ color: "red", fontSize: "16px" }}>
                    {inputError}
                  </div>
                )}
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <button className="flip-card__btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default LoginPage;
