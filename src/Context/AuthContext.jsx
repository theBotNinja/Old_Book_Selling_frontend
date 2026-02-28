import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(JSON.parse(storedUser));
    }, []);


    const login = async (email, password) => {
        try {
            const res = await api.post("/user/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            return { success: true };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Something went wrong"
            };
        }
    };

    const signup = async (name, email, phone, password) => {
        try {
            const res = await api.post("/user/signup", {
                name,
                email,
                mobileNumber: phone,
                password
            });

            return { success: true };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Something went wrong"
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                role: user?.role || null,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
