// Import the required modules
const { useState } = require('react');
const { useMoonSDK } = require('./usemoonsdk');
const { Link } = require('react-router-dom');

// Login Component
function LoginPage({ onLogin }) {
    const { moon } = useMoonSDK();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Authenticate using email and password
            await moon.authenticate({ email, password });
            if (moon?.MoonAccount.isAuth) {
                onLogin();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <p>
                Don't have an account yet? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

module.exports = LoginPage;


