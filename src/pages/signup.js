// Import the required modules
const { useState } = require('react');
const { useMoonSDK } = require('./usemoonsdk');

// Signup Component
function SignupPage({ onSignup }) {
    const { moon } = useMoonSDK();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            // Create a new Moon account with email and password
            const newAccount = await moon.createAccount({ email, password });
            if (newAccount?.isAuth) {
                onSignup();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

module.exports = SignupPage;