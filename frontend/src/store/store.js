import { createContext } from 'react';
import useLocalStorage from "../hooks/useLocalStorage"

const TokenContext = createContext({
    token: null,
    name: null,
    userId: null,
    role: null,
    stToken: (token) => { },
    stId: (userId) => { },
    stName: (name) => { },
    stRole: (name) => { }
});

export function StoreContextProvider(props) {
    const [token, setToken] = useLocalStorage("token", null);
    const [name, setName] = useLocalStorage("name", null);
    const [userId, setUserId] = useLocalStorage("userId", null);
    const [role, setRole] = useLocalStorage("useRole", null);


    function settingToken(token) {
        setToken(token);
    }

    function settingName(name) {
        setName(name);
    }

    function settingId(userId) {
        setUserId(userId);
    }

    function settingRole(role) {
        setRole(role);
    }

    const context = {
        token: token,
        name: name,
        userId: userId,
        role: role,
        stToken: settingToken,
        stName: settingName,
        stId: settingId,
        stRole: settingRole
    };

    return (
        <TokenContext.Provider value={context}>
            {props.children}
        </TokenContext.Provider>
    )
}

export default TokenContext;