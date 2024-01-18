import { create } from 'zustand';
import Cookies from 'js-cookies';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    login: (token) => {
        Cookies.setItem("session_token", token);
        set({ isAuthenticated: true })
    },
    logout: () => {
        Cookies.removeItem("session_token");
        set({ isAuthenticated: false })
    },
    checkAuth: () => {
        if (Cookies.hasItem("session_token")) {
            set({ isAuthenticated: true })
        } else {
            set({ isAuthenticated: false })
        }
    },
}));

export default useAuthStore;