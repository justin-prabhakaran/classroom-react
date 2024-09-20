import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./LoginPage.css";
import LoginImg from "../asset/Reset password-pana1.svg";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../core/redux/store";
import { loginStudent, loginTeacher } from "../../redux/AuthActions";
import { FourSquare } from "react-loading-indicators";
import { useNavigate } from 'react-router-dom';


function App() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, data, error } = useSelector((state: AppState) => state.auth);

  const [activeForm, setActiveForm] = useState<"student" | "teacher">("student");
  const [input, setInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(true); // State to control error popup visibility

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

  
  const renderErrorPopup = () => {
    return (
      <div className="error error-bottom-left">
        <div className="error__icon">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
              fill="#393a37"
            ></path>
          </svg>
        </div>
        <div className="error__title">
          An error occurred: {error || "Unknown error occurred"}
        </div>
        <div className="error__close" onClick={() => { 
            console.log("Close button clicked"); 
            setShowErrorPopup(false);
          }}> {/* This will hide the popup */}
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
              fill="#393a37"
            ></path>
          </svg>
        </div>
      </div>
    );
  };

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
        <FourSquare color="#32cd32" size="medium" text="Logging in..." textColor="#32cd32" />
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

            
            {error && showErrorPopup && renderErrorPopup()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
