import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginPage.css';
import LoginImg from '../asset/Reset password-pana1.svg';
import Button from '../Components/Button';

function App() {
  const [activeForm, setActiveForm] = useState<'student' | 'teacher'>('student');
  const [input, setInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateInput = (input: string): string => {
    if (/^[0-9]+$/.test(input)) { 
      const regNoRegex = /^9537\d{8}$/;
      if (!regNoRegex.test(input)) {
        return 'Invalid Reg No. It should start with 9537';
      }
    } else if (input.includes('@')) { 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input) || !input.endsWith('@aaacet.ac.in')) {
        return 'Invalid email. It should end with @aaacet.ac.in';
      }
    } else if (input !== '') { 
      return 'Input should be starting with 9537 or an email ending with @aaacet.ac.in';
    }
    return ''; 
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    const error = validateInput(newValue);
    setErrorMessage(error);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!errorMessage) {
      alert('Login successful!');
    }
  };

  const handleFormSwitch = (form: 'student' | 'teacher') => {
    setActiveForm(form);
    setInput('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className='content'>
      <div className="container">
        <div className="left">
          <img className='side-image' src={LoginImg} alt='manlin' />
        </div>
        <div className="right">
          <div className="login-container">
            <div className='flipbtn'>
              <button 
                className={`btnstu ${activeForm === 'student' ? 'active' : ''}`} 
                onClick={() => handleFormSwitch('student')}
              >
                Student
              </button>
              <button 
                className={`btntech ${activeForm === 'teacher' ? 'active' : ''}`} 
                onClick={() => handleFormSwitch('teacher')}
              >
                Teacher
              </button>
            </div>
            
            {activeForm === 'student' && (
              <form onSubmit={handleSubmit} className="login-form">
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
                <button className='btn-button' type="submit">Login</button>
              </form>
            )}
            
            {activeForm === 'teacher' && (
              <form onSubmit={handleSubmit} className="login-form">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
