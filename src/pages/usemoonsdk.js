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
    createAccount: null
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

     // Define the createAccount function
    const createAccount = async (privateKey) => {
        if (moon) {
            return moon.createAccount(privateKey);
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
        updateToken,
        createAccount
    };
};