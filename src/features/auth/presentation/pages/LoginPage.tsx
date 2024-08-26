import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [regNo, setRegNo] = useState<string>("");
  const [regNoError, setRegNoError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError,setEmailError] = useState<string>("");
  // Handle form submission for the Student (Log in) form
  const handleStudentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateRegNo(regNo)) {
      setRegNoError("Registration number must be valid !");
      return;
    }

    // Add your logic for handling the student login here
    console.log("Student form submitted");
  };

  // Validate the "Reg No" input
  const validateRegNo = (value: string): boolean => {
    const regNoPattern = /^9537\d*$/;
    return regNoPattern.test(value);
  };

  const validateEmail = (value : string) : boolean => {
    const emailPat = /^[a-zA-Z0-9._%+-]+@aaacet\.ac\.in$/;
    return emailPat.test(value);

  }

  const handleEmailChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
     const val = event.target.value;
     if(validateEmail(val) || val === ""){
        setEmailError("");
     }else{
        setEmailError("Email must be valid !")
     }

     setEmail(val);
  } 


  // Handle change for "Reg No" input
  const handleRegNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (validateRegNo(value) || value === "") {
      setRegNoError("");
    } else {
      setRegNoError("Registration number must be valid !");
    }
    setRegNo(value);
  };

  // Handle form submission for the Teacher (Sign up) form
  const handleTeacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setRegNoError("Email must be valid !");
      return;
    }
    // Add your logic for handling the teacher signup here
    console.log("Teacher form submitted");
  };

  return (
    <>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Student</div>
                <form className="flip-card__form" onSubmit={handleStudentSubmit}>
                  <input
                    className="flip-card__input"
                    name="regNo"
                    placeholder="Reg No"
                    type="text"
                    value={regNo}
                    onChange={handleRegNoChange}
                  />
                  {regNoError && <div style={{ color: "red" , fontSize : "16px" }}>{regNoError}</div>}
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <button className="flip-card__btn" type="submit">
                    Submit
                  </button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Teacher</div>
                <form className="flip-card__form" onSubmit={handleTeacherSubmit}>
                  
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleEmailChange}
                  />
                  {emailError && <div style={{color : "red", fontSize : "16px"}}>{emailError}</div>}
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
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
    </>
  );
};

export default LoginPage;
