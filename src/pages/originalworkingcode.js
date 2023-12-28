const { useState, useEffect } = require('react');
const { useMoonSDK } = require('./usemoonsdk');

function MyApp() {
    const [accounts, setAccounts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const { listAccounts, moon } = useMoonSDK();

    // Check if we're on the client side (browser)
    const ethereum = typeof window !== 'undefined' ? window.ethereum : null;

    const SIWE = async () => {
        if (ethereum && typeof ethereum !== 'undefined') {
            try {
                const address = await ethereum.request({ method: 'eth_requestAccounts' });
                console.log(address);

                const challengeResponse = await fetch('https://vault-api.usemoon.ai/auth/ethereum/challenge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        address: address[0],
                    }),
                });

                // ... rest of your code

            } catch (error) {
                console.error(error);
            }
        } else {
            console.warn('Ethereum object not available.');
        }
    };

    useEffect(() => {
        if (moon?.MoonAccount.isAuth) {
            setLoggedIn(true);
            getAccounts();
        }
    }, [moon]);

    const getAccounts = async () => {
        const accounts = await listAccounts();
        const newAccounts = (accounts?.data.data.keys || []).slice(0, 1); // Take the first account
        setAccounts(newAccounts);
    };

    return (
        <div>
            {loggedIn ? (
                <h1>Logged In</h1>
            ) : (
                <button id="siw-ethereum" onClick={SIWE}>
                    Connect with Ethereum
                </button>
            )}

            {accounts.length > 0 ? (
                <ul>
                    {accounts.map((account, index) => (
                        <li key={index}>{account}</li>
                    ))}
                </ul>
            ) : (
                <p>No accounts available.</p>
            )}
        </div>
    );
}

module.exports = MyApp;

