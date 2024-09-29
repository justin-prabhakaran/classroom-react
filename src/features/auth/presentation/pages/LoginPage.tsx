import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./LoginPage.css";
import LoginImg from "../asset/Reset password-pana1.svg";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../core/redux/store";
import { getCurrentUser, loginStudent, loginTeacher } from "../../redux/AuthActions";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from "@mui/material";


function LoginPage() {

  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [])

  const { isLoading, data, error } = useSelector((state: AppState) => state.auth);

  const [activeForm, setActiveForm] = useState<"student" | "teacher">("student");
  const [input, setInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false); // State to control error popup visibility

  const validateInput = (input: string): string => {
    if (/^[0-9]+$/.test(input)) {
      const regNoRegex = /^9537\d{8}$/;
      if (!regNoRegex.test(input)) {
        return "Invalid Reg No. It should start with 9537";
      }
    } else if (input.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input) || !input.endsWith("@aaacet.ac.in")) {
        return "Invalid email. It should end with @aaacet.ac.in";
      }
    } else if (input !== "") {
      return "Input should be starting with 9537 or an email ending with @aaacet.ac.in";
    }
    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    const error = validateInput(newValue);
    setErrorMessage(error);
  };

  const handleSubmit = async (e: FormEvent, isStudent: boolean) => {
    e.preventDefault();

    if (isLoading) {
      console.log("Loading in progress. Cannot submit form.");
      return;
    }

    const username: string = input;
    const pass: string = password;

    if (validateInput(username) === "" && pass !== "") {
      if (isStudent) {
        dispatch(loginStudent(username, pass, Number(username)));
      } else {
        dispatch(loginTeacher(username, pass));
      }
    } else {
      setErrorMessage("Please enter valid credentials.");
    }
  };

  const handleFormSwitch = (form: "student" | "teacher") => {
    setActiveForm(form);
    setInput("");
    setPassword("");
    setErrorMessage("");
  };

  // Handle redirection to home on successful login
  useEffect(() => {
    if (data && !isLoading) {
      navigate('/home');
    }
  }, [data, isLoading, navigate]);


  useEffect(() => {
    if (error) {
      setShowErrorPopup(true);
    } else setShowErrorPopup(false);
  }, [error]);



  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ThreeDot color="var(--primaryBlue)" size="medium" text="Logging in..." textColor="var(--primaryBlue)" />
      </div>
    );
  }


  return (
    <div className="content">
      <div className="container">
        <div className="left">
          <img className="side-image" src={LoginImg} alt="login graphic" />
        </div>

        <div className="right">
          <div className="login-container">
            <div className="flipbtn">
              <button
                className={`btnstu ${activeForm === "student" ? "active" : ""}`}
                onClick={() => handleFormSwitch("student")}
              >
                Student
              </button>
              <button
                className={`btntech ${activeForm === "teacher" ? "active" : ""}`}
                onClick={() => handleFormSwitch("teacher")}
              >
                Teacher
              </button>
            </div>

            {activeForm === "student" && (
              <form onSubmit={(e) => handleSubmit(e, true)} className="login-form">
                <h2>Student Login</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <input
                  type="text"
                  placeholder="Email / Reg No"
                  value={input}
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn-button" type="submit">
                  Login
                </button>
              </form>
            )}

            {activeForm === "teacher" && (
              <form onSubmit={(e) => handleSubmit(e, false)} className="login-form">
                <h2>Teacher Login</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <input
                  type="text"
                  placeholder="Email"
                  value={input}
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button />
              </form>
            )}


            {<Snackbar
              open={showErrorPopup}
              autoHideDuration={4000}

              // style={{
              //   color: "#721c24",
              //   backgroundColor: " #f8d7da"
              // }}

              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}

              onClose={() => {
                setShowErrorPopup(false);
              }}
            >
              <Alert
                severity="error"
                variant="filled"
              >{error?.data}</Alert>
            </Snackbar>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
