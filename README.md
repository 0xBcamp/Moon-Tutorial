#  🌘 An Introduction to Moon 💻

Welcome to the Moon Workshop, your comprehensive guide to exploring and integrating the Moon ecosystem. This workshop will take you through the various components of Moon, helping you harness its power for developing user-friendly dApps, secure authentication, and AI-compatible transactions.

- [Product Description](#product-description-)
- [Architecture](#architecture)
- [Tutorial](#tutorial-)
- [Resources](#resources-)
- [Troubleshooting](#troubleshooting-)

## Product Description 🧩

Moon is a highly composable wallet infrastructure designed to simplify user-friendly, AI-compatible dApp development. Comprising wallet as a service, authentication as a service, and AI as a service products, Moon offers seamless integration for payment processing, data infrastructure solutions, highly steamlined and abstracted blockchain transations, and more. Moon is compatible with all standard EVM blockchains, allowing developers and users a universal experience regalrdess of what chain being used.

### Key Features 🚀

- **Wallet as a Service:** Moon's flexible wallet infrastrucutre eliminate complex wallet management, providing a hassle-free solution for integration.

- **Authentication as a Service:** Secure authentication is at the core of Moon, offering web authentication and OAuth2 for Web2 sign-ins with robust web3 security.

- **AI as a Service:** Harness the power of AI with Moon's MoonGPT service, enabling easy LLM integration into transactions and interactions on the blockchain.

- **Payment Processing Solutions:** Streamlined payment processing solutions for both conventional and AI-powered transactions.

- **Data Infrastructure Solutions:** Moon Data provides a robust and fast data infrastructure with vectorized AI-friendly capabilities.

### Key Development Tools ⌨️

- **Moon SDK:** Moon provides developers with a powerful Software Development Kit (SDK) in multiple languages, offering pre-built components such as code snippets and a React boilerplate. This SDK serves as a robust foundation for initiating and maintaining projects. Check out Moon SDK in multiple languages [here!](https://github.com/moon-up)

- **Moon API:** In addition, the Moon API library streamlines blockchain interactions with the Moon platform. Developers can leverage this library to fetch account details, initiate transactions, configure authentication, handle session management, and more. Check out Moon API documentation [here!](https://docs.usemoon.ai/)

## Architecture

![Moon High-Level Architecture](https://github.com/0xBcamp/Moon-Tutorial/blob/main/moon_flowchart.png)

Moon GPT, Moon SDK, Moon pre-built components, and Moon React Boilerplate seamlessly interact with the Moon API, which offers a comprehensive library of endpoints for direct engagement with the blockchain. Specifically tailored for Moon's wallet, authentication, and data infrastructure, the Moon API facilitates user authentication, allowing users to sign transactions from their wallets and acquire a secure JSON Web Token (JWT). The authenticated private keys are securely stored in the HashCorp Vault.

Users can construct and sign transactions using methods similar to those in ether.js. The transaction data is then available for custom APIs and account abstraction mechanisms to interact with the blockchain. The Moon API extends its capabilities to Moon's data infrastructure, enabling smooth interactions with Moon data. This data can be seamlessly linked to databases like PostgreSQL or other indexing software, providing a user-friendly navigation experience through the blockchain.

## Tutorial ✅

### Video Tutorial 🎥

[![Moon Workshop Tutorial](link-to-tutorial-video-thumbnail)](link-to-tutorial-video) COMING SOON

### What You Will Learn 💡

- Setting up Moon SDK and integrating it into your project.
- Initilizing your project by setting up a Moon SDK React Hook, complete with helpful starter functions.
- Creating a simple front end login page to create a Moonup account.

### Tutorial Steps 📋

#### Setting up Your Project with Moon SDK ✅

To get started with Moon SDK, clone the repository, install the required dependencies, and create a react & next.js boilerplate project using either npm or yarn.

1. Clone the github moon-sdk package. Please note this package is available in multiple languagues. For this tutorial, we will clone the below TypeScript package.
```
git clone https://github.com/moon-up/moon-sdk.git
```
2. Navigate to moon-sdk - the git package we just cloned.
```
cd moon-sdk
```
3. Install  @moonup/moon-sdk, which will give install the dependencies needed to start our project.

Using npm
```
npm install @moonup/moon-sdk
```
Using yarn
```
yarn add @moonup/moon-sdk
```
4. Create the Next.JS and React boilderplate using npx @moonup/create
```
npx @moonup/create
```
5. Answer the questions to create the Next.js and React boilerplate. While you can certianly configure options as needed for the project, let's enter the below for this tutorial. Let's name our app 'my-moon-app-test' and select 'Yes' for all options, expcept for ' default import alias'.
```
? What is your project named? » my-moon-app-test
? Would you like to use TypeScript? » Yes
? Would you like to use ESLint? » Yes
? Would you like to use PWA? » Yes
? Would you like to use Moon Wallet? » Yes
? Would you like to use Tailwind CSS? » Yes
? Would you like to use `src/` directory? » Yes
? Would you like to customize the default import alias (@/*)? » No
```
#### Initlizing Your Project with a Moon SDK React Hook ✅

Now that we have our boilerplate, let's code a componenet that initilizes and connects our project to the Moonup platform. We will also set up some other functions that may be useful to our project: initialize, dissconnect, update token, and more. This componenet will be defined as 'MoonSDKHook' and will be configured as a React hook to uilize in other componenents of our project.

1. Navigate to the pages folder of my-moon-app-test using the below file path.
```
cd moon-sdk/my-moon-app-test/src/pages
```
2. Create a new React componenet titled: 'usemoonsdk.tsx'
```
touch usemoonsdk.tsx
```
3. Open usemoonsdk.tsx with your preferred text editor, and let's start coding. First let's import 4 required modules: Moon SDK, useState React Hook, Moon Types: AUTH, MOON_SESSION_KEY, Storage - all included in the Moon Types package and needed for MoonUp initilization, and Moon API interface 'CreateAccountInput'- needed later on for the Create Account function.
```
import { MoonSDK } from "@moonup/moon-sdk";
import { useState } from "react";
import { AUTH, MOON_SESSION_KEY, Storage } from "@moonup/moon-types";
import { CreateAccountInput } from "@moonup/moon-api";
```

5. Now let's define the useMoonSDK function and export it as a React hook.
```
export const useMoonSDK = () => {
}
```
7. Let's create moon as a state variable and place that inside the useMoonSDK React hook.
```
export const useMoonSDK = () => {
const [moon, setMoon] = useState<MoonSDK | null>(null);
}
```
8. Let's define the initilization function. This function is important as it sets up the MoonSDK instance, configuring essential parameters such as storage key, storage type, and authentication type (JWT). Additionally, it initializes the MoonSDK instance and performs a login operation, ensuring that the MoonSDK is ready for seamless interaction with the Moon API and other related functionalities.
```
    const initialize = async () => {
        const moonInstance = new MoonSDK({
            Storage: {
                key: MOON_SESSION_KEY,
                type: Storage.SESSION,
            },
            Auth: {
                AuthType: AUTH.JWT,
            },

        });
        setMoon(moonInstance);
        moonInstance.login();
    };
```
9. Let's now define additional functions we will need for our code: update token, create account, and disconnect. There are many more functions you can defined, but these are commmon ones you may use on your moon project.
```

    const updateToken = async (token: string, refreshToken: string) => {
        if (moon) {
            moon.updateToken(token);
            moon.updateRefreshToken(refreshToken);

            moon.login();
        }
    };

    const createAccount = async () => {
        if (moon) {
            const data: CreateAccountInput = {};
            const newAccount = await moon?.getAccountsSDK().createAccount(data);
            return newAccount;
        }
    }

    const disconnect = async () => {
        if (moon) {
            await moon.disconnect();
            sessionStorage.removeItem(MOON_SESSION_KEY)
            setMoon(null);
        }
    }
```
10. Finally, return the MoonSDKHook object with all state variables and functions we defined in the above. This way, these variables and functions can be used in other componenents of our project.
```
    return {
        moon,
        initialize,
        updateToken,
        createAccount,
        disconnect,
    }
```
11. Here is the full code for usemoonsdk.tsx
```
import { MoonSDK } from "@moonup/moon-sdk";
import { useState } from "react";
import { AUTH, MOON_SESSION_KEY, Chain,Storage } from "@moonup/moon-types";
import { CreateAccountInput } from "@moonup/moon-api";

export const useMoonSDK = () => {
    const [moon, setMoon] = useState<MoonSDK | null>(null);

    const initialize = async () => {
        const moonInstance = new MoonSDK({
            Storage: {
                key: MOON_SESSION_KEY,
                type: Storage.SESSION,
            },
            Auth: {
                AuthType: AUTH.JWT,
            },

        });
        setMoon(moonInstance);
        moonInstance.login();
    };

    const updateToken = async (token: string, refreshToken: string) => {
        if (moon) {
            moon.updateToken(token);
            moon.updateRefreshToken(refreshToken);

            moon.login();
        }
    };

    const createAccount = async () => {
        if (moon) {
            const data: CreateAccountInput = {};
            const newAccount = await moon?.getAccountsSDK().createAccount(data);
            return newAccount;
        }
    }

    const disconnect = async () => {
        if (moon) {
            await moon.disconnect();
            sessionStorage.removeItem(MOON_SESSION_KEY)
            setMoon(null);
        }
    }

    return {
        moon,
        initialize,
        updateToken,
        createAccount,
        disconnect,
    }
}
```
#### Creating a Simple Front End Login Page ✅


Now that we've established our project's foundation, complete with the usemoonsdk.tsx component for project initialization, let's craft a straightforward front-end signup page. This page will enable users to create a Moon account, sign in, and obtain an authenticated wallet address.

It's important to mention that, for the sake of this tutorial, we won't delve into styling intricacies or the modularization of initialize, signup, and signin pages into separate components. The primary focus here is to spotlight the code logic. Feel free to explore and implement styling or structural improvements after completing the tutorial.

1. Import the React use state hook, useMoonSDK hook, and Moon API interfaces for email login and sign up at the beginning of the _app.tsx file.
```
import { useState } from 'react';
import { useMoonSDK } from './useMoonSDK';
import { EmailLoginInput, EmailSignupInput } from '@moonup/moon-api';
```
2. Create the SignupPage component and initialize state variables.
```
const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [authenticatedAddress, setAuthenticatedAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


};

export default SignupPage;
```
3. Initialize the useMoonSDK hook to access Moon functionalities.
```
const { moon, createAccount, disconnect, updateToken, initialize } = useMoonSDK();
```
4. Implement functions to handle form input changes.
```
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
```
5. Implement the handleInitializeAndConnect function for initializing and connecting to Moon.
```
    const handleInitializeAndConnect = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Initializing and connecting to Moon...');
            await initialize();
            console.log('Connected to Moon!');
            setIsConnected(true);
        } catch (error) {
            console.error('Error during connection:', error);
            setError('Error connecting to Moon. Please try again.');
        } finally {
            setLoading(false);
        }
    };
```
6. Implement the handleSignup function for user registration.
```
 const handleSignup = async () => {
        try {
            setLoading(true);
            setError(null);
            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');

                const auth = moon.getAuthSDK();
                const signupRequest: EmailSignupInput = {
                    email,
                    password,
                };
                console.log('Signing up...');
                const signupResponse: any = await auth.emailSignup(signupRequest);
                console.log('Signup successful:', signupResponse);

                setSignupSuccess(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Error signing up. Please try again.');
        } finally {
            setLoading(false);
        }
    };
```
7. Implement the handleSignIn function for user authentication and sign-in.
```
   const handleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);


            const auth = moon.getAuthSDK();
            const loginRequest: EmailLoginInput = {
                email,
                password,
            };
            console.log('Authenticating...');
            const loginResponse: any = await auth.emailLogin(loginRequest);
            console.log('Authentication successful:', loginResponse);

            console.log('Updating tokens and email...');
            await updateToken(loginResponse.data.token, loginResponse.data.refreshToken);
            moon.MoonAccount.setEmail(email);
            moon.MoonAccount.setExpiry(loginResponse.data.expiry);
            console.log('Tokens and email updated!');


            console.log('Creating account...');
            const newAccount = await createAccount();
            console.log('New Account Data:', newAccount?.data);
            console.log('Setting expiry and navigating...');
            moon.MoonAccount.setExpiry(loginResponse.data.expiry);
            setSignInSuccess(true);
            setAuthenticatedAddress(newAccount.data.data.address);
            console.log('Authenticated Address:', newAccount.data.data.address);
        } catch (error) {
            console.error('Error during sign-in:', error);
            setError('Error signing in. Please try again.');
        } finally {
            setLoading(false);
        }
    };
```
8. Implement the handleDisconnect function for disconnecting from Moon.
```
const handleDisconnect = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Disconnecting...');
            await disconnect();
            console.log('Disconnected');
            setIsConnected(false);
        } catch (error) {
            console.error('Error during disconnection:', error);
            setError('Error disconnecting from Moon. Please try again.');
        } finally {
            setLoading(false);
        }
    };
```
9. Finally, return the JSX structure for the entire SignupPage component. Use the state variables for IsConnected, SignupSuccess, & SigninSuccess for IF statements for each page, so the user can successfuly naviage through the application based on their connection, sign-up or sign-in status.
```
return (
        <div className="flex justify-center items-center h-screen">
            {!isConnected && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Initialize & Connect to Moon</h2>
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleInitializeAndConnect}
                    >
                        {loading ? 'Connecting...' : 'Initialize & Connect to Moon'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}

            {isConnected && !signupSuccess && !signInSuccess && (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-4 text-center">Sign up for a Moon Account</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded mb-2"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded mb-2"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`w-full border p-2 rounded mb-2 ${passwordError ? 'border-red-500' : ''}`}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xs italic">{passwordError}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleSignup}
                        >
                            {loading ? 'Signing up...' : 'Sign up for a Moon Account'}
                        </button>
                        {error && <p className="text-red-500 ml-2">{error}</p>}
                    </div>
                </form>
            )}

            {signupSuccess && !signInSuccess && isConnected && (
                <div className="mb-4 text-center">
                    <p>Congratulations! Your Moon account is created.</p>
                    <p>Now that you have created an account, sign in.</p>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-2 rounded mb-2"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border p-2 rounded mb-2"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSignIn}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                            {error && <p className="text-red-500 ml-2">{error}</p>}
                        </div>
                    </form>
                </div>


            )}

            {signInSuccess && isConnected && (
                <div className="mt-4 text-center">
                    <p>Authenticated Address: {authenticatedAddress}</p>
                    <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded mt-2"
                        onClick={handleDisconnect}
                    >
                        {loading ? 'Disconnecting...' : 'Disconnect from Moon'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
```
10. The full code is below and also available in this repo. Again, the primary focus here is to spotlight the code logic. Feel free to explore and implement styling or structural improvements on your own.
```
import { useState } from 'react';
import { useMoonSDK } from './useMoonSDK';
import { EmailLoginInput, EmailSignupInput } from '@moonup/moon-api';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [authenticatedAddress, setAuthenticatedAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { moon, createAccount, disconnect, updateToken, initialize } = useMoonSDK();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleInitializeAndConnect = async () => {
        try {
            setLoading(true);
            setError(null);

            // Initialize and connect to Moon
            console.log('Initializing and connecting to Moon...');
            await initialize();
            console.log('Connected to Moon!');
            setIsConnected(true);
        } catch (error) {
            console.error('Error during connection:', error);
            setError('Error connecting to Moon. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        try {
            setLoading(true);
            setError(null);

            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');

                // Sign up the user
                const auth = moon.getAuthSDK();
                const signupRequest: EmailSignupInput = {
                    email,
                    password,
                };
                console.log('Signing up...');
                const signupResponse: any = await auth.emailSignup(signupRequest);
                console.log('Signup successful:', signupResponse);

                setSignupSuccess(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Error signing up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);

            // Authenticate the user and sign in
            const auth = moon.getAuthSDK();
            const loginRequest: EmailLoginInput = {
                email,
                password,
            };
            console.log('Authenticating...');
            const loginResponse: any = await auth.emailLogin(loginRequest);
            console.log('Authentication successful:', loginResponse);

            // Set tokens and email
            console.log('Updating tokens and email...');
            await updateToken(loginResponse.data.token, loginResponse.data.refreshToken);
            moon.MoonAccount.setEmail(email);
            moon.MoonAccount.setExpiry(loginResponse.data.expiry);
            console.log('Tokens and email updated!');

            // Perform sign-in logic with MoonSDK
            console.log('Creating account...');
            const newAccount = await createAccount();
            console.log('New Account Data:', newAccount?.data);
            console.log('Setting expiry and navigating...');
            moon.MoonAccount.setExpiry(loginResponse.data.expiry);
            setSignInSuccess(true);
            setAuthenticatedAddress(newAccount.data.data.address);
            console.log('Authenticated Address:', newAccount.data.data.address);
        } catch (error) {
            console.error('Error during sign-in:', error);
            setError('Error signing in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setLoading(true);
            setError(null);

            // Disconnect from Moon
            console.log('Disconnecting...');
            await disconnect();
            console.log('Disconnected');
            setIsConnected(false);
        } catch (error) {
            console.error('Error during disconnection:', error);
            setError('Error disconnecting from Moon. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {!isConnected && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Initialize & Connect to Moon</h2>
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleInitializeAndConnect}
                    >
                        {loading ? 'Connecting...' : 'Initialize & Connect to Moon'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}

            {isConnected && !signupSuccess && !signInSuccess && (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-4 text-center">Sign up for a Moon Account</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded mb-2"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded mb-2"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`w-full border p-2 rounded mb-2 ${passwordError ? 'border-red-500' : ''}`}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xs italic">{passwordError}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleSignup}
                        >
                            {loading ? 'Signing up...' : 'Sign up for a Moon Account'}
                        </button>
                        {error && <p className="text-red-500 ml-2">{error}</p>}
                    </div>
                </form>
            )}

            {signupSuccess && !signInSuccess && isConnected && (
                <div className="mb-4 text-center">
                    <p>Congratulations! Your Moon account is created.</p>
                    <p>Now that you have created an account, sign in.</p>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-2 rounded mb-2"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border p-2 rounded mb-2"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSignIn}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                            {error && <p className="text-red-500 ml-2">{error}</p>}
                        </div>
                    </form>
                </div>


            )}

            {signInSuccess && isConnected && (
                <div className="mt-4 text-center">
                    <p>Authenticated Address: {authenticatedAddress}</p>
                    <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded mt-2"
                        onClick={handleDisconnect}
                    >
                        {loading ? 'Disconnecting...' : 'Disconnect from Moon'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default SignupPage;
```
11. To run the application, navigate in the terminal to the project folder
 ```
cd moon-sdk/my-moon-test-app
 ```
12. Launch the application by entering the following command in your terminal:

For npm:
 ```
npm run dev
 ```
or for yarn:
 ```
yarn dev
 ```
and navigate to the proper local host site.

## Resources 📚

- **Moon SDK GitHub:** [https://github.com/moon-up/moon-sdk](https://github.com/moon-up/moon-sdk)
- **Moon API Documentation:** [https://docs.usemoon.ai/](https://docs.usemoon.ai/)
-  **Moon Swagger API Documentation:** [https://vault-api.usemoon.ai/.well-known/swagger.json](https://vault-api.usemoon.ai/.well-known/swagger.json)
- **MoonGPT Chat:** [https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai](https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai)
- **Moon Package Documentation:** [https://docs.usemoon.ai/docs/moon-sdk/introduction](https://docs.usemoon.ai/docs/moon-sdk/introduction)
- **Moon ChatGPT AI Plugin Spec:** [https://vault-api.usemoon.ai/.well-known/ai-plugin.json](https://vault-api.usemoon.ai/.well-known/ai-plugin.json)

## Troubleshooting 👯

If you encounter any issues or have questions, join our [Discord community](https://discord.gg/UpG6Gmks) for support and discussions.
