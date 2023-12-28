import React, { useState, useEffect } from 'react';
import { useMoonSDK } from './usemoonsdk';
import { ethers } from 'ethers';

// Signup Component
function SignupPage({ onSignup }) {
    const { moon, initialize, disconnect } = useMoonSDK();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const handleSignup = async () => {
        try {
            // Check if Moon SDK is properly initialized and user is authenticated
            if (!moon || !moon.MoonAccount.isAuth) {
                console.error('User not authenticated');
                return;
            }

            // Generate a new Ethereum private key
            const privateKey = ethers.Wallet.createRandom().privateKey;

            // Convert private key to hex format
            const privateKeyHex = privateKey.substring(2); // Remove '0x' prefix

            // Create a new Moon account with email, password, and wallet address
            await moon.getAccountsSDK().createAccount({
                private_key: privateKeyHex,
                email,
                password,
                wallet_address: walletAddress,
            });

            // Perform additional actions if signup is successful
            onSignup();
        } catch (error) {
            console.error(error);
        }
    };

    // Use useEffect to initialize Moon SDK on component mount
    useEffect(() => {
        initialize();

        // Cleanup Moon SDK on component unmount
        return () => {
            disconnect();
        };
    }, []);

    return (
        <div>
            <h2>Create Moon Account</h2>
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
                <label>
                    Wallet Address:
                    <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleSignup}>
                    Create Wallet
                </button>
            </form>
        </div>
    );
}

export default SignupPage;