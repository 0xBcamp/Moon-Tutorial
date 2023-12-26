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

High Level Architecture Description Insert Here

## Tutorial ✅

### Video Tutorial 🎥

[![Moon Workshop Tutorial](link-to-tutorial-video-thumbnail)](link-to-tutorial-video)

### What You Will Learn 💡

- Setting up Moon SDK and integrating it into your project.
- Initilizing your project by setting up a Moon SDK React Hook, complete with helpful starter functions.
- Creating a simple front end login page to create and sign in with a Moonup account.

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
5. Answer the questions to create the Next.js and React boilerplate. While you can certianly configure options as needed for the project, let's enter the below for this tutorial. Let's use name our app 'my-moon-app-test', use JavaScript as the primary lanuguaue - we do so by selecting 'No' to TypeScript, and select 'Yes' for all other options, expcept for ' default import alias'.
```
? What is your project named? » my-moon-app-test
? Would you like to use TypeScript? » No
? Would you like to use ESLint? » Yes
? Would you like to use PWA? » Yes
? Would you like to use Moon Wallet? » Yes
? Would you like to use Tailwind CSS? » Yes
? Would you like to use `src/` directory? » Yes
? Would you like to customize the default import alias (@/*)? » No
```
#### Initlizing Your Project with a Moon SDK React Hook ✅

Now that we have our boilerplate, let's code a componenet that initilizes and connects our project to the Moonup platform. We will also set up some other functions that may be useful to our project: dissconnect, list accounts, and update token. This componenet will be defined as 'MoonSDKHook' and will be configured as a React hook to uilize in other componenents of our project.

1. Navigate to the pages folder of my-moon-app-test using the below file path.
```
cd moon-sdk/my-moon-app-test/src/pages
```
2. Create a new React componenet titled: 'usemoonsdk.js'
```
touch usemoonsdk.js
```
3. Open usemoonsdk.js with your preferred text editor, and let's start coding. First let's import 3 required modules: Moon SDK, Moon Types: AUTH, MOON_SESSION_KEY, Storage - all included in the Moon Types package and needed for MoonUp inilization, and React hooks of useEffect and useState.
```
// Import the required modules
const { MoonSDK } = require('@moonup/moon-sdk');
const { AUTH, MOON_SESSION_KEY, Storage } = require('@moonup/moon-types');
const { useEffect, useState } = require('react');
```
4. Now let's define our Moon SDK interface, defining a MoonSDKHook variable. The MoonSDKHook is comprised of several items we will use within the codes core functions.
```
// Define the MoonSDKHook interface
const MoonSDKHook = {
    moon: null,
    initialize: null,
    disconnect: null,
    listAccounts: null,
    updateToken: null,
};
```
5. Now let's define the useMoonSDK function and export it as a React hook. This function initializes the Moon SDK and connects to the MoonUp platform.
```
// Export the useMoonSDK function
module.exports.useMoonSDK = function () {
    // Use useState to create state variables
    const [moon, setMoon] = useState(null);
    // Define the initialize function
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
        // Connect to the MoonUp platform
        await moonInstance.connect();
        setMoon(moonInstance);
        moonInstance.login();
    };
```
6. Let's define some additional functions for disconnect, list accounts, and update token. More functions can be defined, but for now, we will define these 3 as common functions you may use on your project.
```
    // Define the disconnect function
    const disconnect = async () => {
        if (moon) {
            await moon.disconnect();
            setMoon(null);
        }
    };
    // Define the listAccounts function
    const listAccounts = async () => {
        if (moon) {
            return moon.listAccounts();
        }
    };
    // Define the updateToken function
    const updateToken = async (token) => {
        if (moon) {
            return moon.updateToken(token);
        }
    };
```
7. Use useEffect to call initialize on component mount.
```
    // Use useEffect to call initialize on component mount
    useEffect(() => {
        initialize();
    }, []);
```
8. Finally, return the MoonSDKHook object with all state variables and functions we defined in the above. This way, these variables and functions can be used in other componenents of our project.
```
    // Return the MoonSDKHook object
    return {
        ...MoonSDKHook,
        moon,
        initialize,
        disconnect,
        listAccounts,
        updateToken
    };
};
```
9. Here is the full code for usemoonsdk.js
```
// Import the required modules
const { MoonSDK } = require('@moonup/moon-sdk');
const { AUTH, MOON_SESSION_KEY, Storage } = require('@moonup/moon-types');
const { useEffect, useState } = require('react');
// Define the MoonSDKHook interface
const MoonSDKHook = {
    moon: null,
    initialize: null,
    disconnect: null,
    listAccounts: null,
    updateToken: null,
};
// Export the useMoonSDK function
module.exports.useMoonSDK = function () {
    // Use useState to create state variables
    const [moon, setMoon] = useState(null);
    // Define the initialize function
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
        // Connect to the MoonUp platform
        await moonInstance.connect();
        setMoon(moonInstance);
        moonInstance.login();
    };
    // Define the disconnect function
    const disconnect = async () => {
        if (moon) {
            await moon.disconnect();
            setMoon(null);
        }
    };
    // Define the listAccounts function
    const listAccounts = async () => {
        if (moon) {
            return moon.listAccounts();
        }
    };
    // Define the updateToken function
    const updateToken = async (token) => {
        if (moon) {
            return moon.updateToken(token);
        }
    };
    // Use useEffect to call initialize on component mount
    useEffect(() => {
        initialize();
    }, []);
    // Return the MoonSDKHook object
    return {
        ...MoonSDKHook,
        moon,
        initialize,
        disconnect,
        listAccounts,
        updateToken
    };
};
```
#### Creating a Simple Front End Login Page ✅

Now that we have set-up our boilerplate complete with the usemoonsdk.js componenent to initlize the project, let's create a simple front end login page to create a Moon account, or sign in with an existing Moon account.

## Resources 📚

- **Moon SDK GitHub:** [https://github.com/moon-up/moon-sdk](https://github.com/moon-up/moon-sdk)
- **Moon API Documentation:** [https://docs.usemoon.ai/](https://docs.usemoon.ai/)
-  **Moon Swagger API Documentation:** [https://vault-api.usemoon.ai/.well-known/swagger.json](https://vault-api.usemoon.ai/.well-known/swagger.json)
- **MoonGPT Chat:** [https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai](https://chat.openai.com/g/g-1Ou9DoNMd-usemoon-ai)
- **Moon Package Documentation:** [https://docs.usemoon.ai/docs/moon-sdk/introduction](https://docs.usemoon.ai/docs/moon-sdk/introduction)
- **Moon ChatGPT AI Plugin Spec:** [https://vault-api.usemoon.ai/.well-known/ai-plugin.json](https://vault-api.usemoon.ai/.well-known/ai-plugin.json)

## Troubleshooting 👯

If you encounter any issues or have questions, join our [Discord community](https://discord.gg/UpG6Gmks) for support and discussions.
