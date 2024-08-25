import "./LoginPage.css"

function LoginPage() {
  return (
    <>
        <div className="login-div">
            <div className="login-form">
                <div className="form-item">
                    <label className="form-label" htmlFor="regno">
                        Register Number
                    </label>
                    <input className="form-input" type="text" name="regno" id="regno" />
                </div>
                <div className="form-item">
                    <label className="form-label" htmlFor="pass">
                        Password
                    </label>
                    <input className="form-input" type="password" name="pass" id="pass" />
                </div>

                <button className="form-btn">Login</button>
            </div>
        </div>
    </>
  )
}

export default LoginPage