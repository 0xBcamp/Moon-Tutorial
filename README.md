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

- **Moon SDK:** Moon provides developers with a powerful Software Development Kit (SDK) in multiple languages, offering pre-built components such as code snippets and a React boilerplate. This SDK serves as a robust foundation for initiating and maintaining projects.

- **Moon API:** In addition, the Moon API library streamlines blockchain interactions with the Moon platform. Developers can leverage this library to fetch account details, initiate transactions, configure authentication, handle session management, and more.

## Architecture

![Moon High-Level Architecture](https://github.com/0xBcamp/Moon-Tutorial/blob/main/moon_flowchart.png)

Moon GPT, Moon SDK, Moon pre-built components, and Moon React Boilerplate seamlessly interact with the Moon API, which offers a comprehensive library of endpoints for direct engagement with the blockchain. Specifically tailored for Moon's wallet, authentication, and data infrastructure, the Moon API facilitates user authentication, allowing users to sign transactions from their wallets and acquire a secure JSON Web Token (JWT). The authenticated private keys are securely stored in the HashCorp Vault.

Users can construct and sign transactions using methods similar to those in ether.js. The transaction data is then available for custom APIs and account abstraction mechanisms to interact with the blockchain. The Moon API extends its capabilities to Moon's data infrastructure, enabling smooth interactions with Moon data. This data can be seamlessly linked to databases like PostgreSQL or other indexing software, providing a user-friendly navigation experience through the blockchain.

## Tutorial ✅

### Video Tutorial 🎥

[![Moon Workshop Tutorial](link-to-tutorial-video-thumbnail)](link-to-tutorial-video)

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

Now that we have our boilerplate, let's code a componenet that initilizes and connects our project to the Moonup platform. We will also set up some other functions that may be useful to our project: dissconnect, list accounts, update token, anr more. This componenet will be defined as 'MoonSDKHook' and will be configured as a React hook to uilize in other componenents of our project.

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
9. Let's now define additional functions we will need for our code: connect, update token, create account, and disconncet. There are many more functions you can defined, but these are commmon ones you may use on your moon project.
```

    const connect = async () => {
        if (moon) {
            return moon.connect();
        }
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
```
10. Finally, return the MoonSDKHook object with all state variables and functions we defined in the above. This way, these variables and functions can be used in other componenents of our project.
```
    return {
        moon,
        initialize,
        connect,
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

    const connect = async () => {
        if (moon) {
            return moon.connect();
        }
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
        connect,
        updateToken,
        createAccount,
        disconnect,
    }
}
```
#### Creating a Simple Front End Login Page ✅

Now that we have set-up our boilerplate complete with the usemoonsdk.tsx componenent to initlize the project, let's create a simple front end signup page to create a Moon account.

## Resources 📚

- **Moon SDK GitHub:** [https://github.com/moon-up/moon-sdk](https://github.com/moon-up/moon-sdk)
- **Moon API Documentation:** [https://docs.usemoon.ai/](https://docs.usemoon.ai/)
-  **Moon Swagger API Documentation:** [https://vault-api.usemoon.ai/.well-known/swagger.json](https://vault-api.usemoon.ai/.well-known/swagger.json)
- **MoonGPT Chat:** [https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai](https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai)
- **Moon Package Documentation:** [https://docs.usemoon.ai/docs/moon-sdk/introduction](https://docs.usemoon.ai/docs/moon-sdk/introduction)
- **Moon ChatGPT AI Plugin Spec:** [https://vault-api.usemoon.ai/.well-known/ai-plugin.json](https://vault-api.usemoon.ai/.well-known/ai-plugin.json)

## Troubleshooting 👯

If you encounter any issues or have questions, join our [Discord community](https://discord.gg/UpG6Gmks) for support and discussions.
