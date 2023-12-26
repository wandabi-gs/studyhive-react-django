import create from 'zustand';

const useThemeStore = create((set) => ({
    darkModeEnabled: false,
    toggleDarkMode: () => {
        document.documentElement.classList.contains('dark') ? set({ darkModeEnabled: false }) : set({ darkModeEnabled: true })
        document.documentElement.classList.toggle('dark')
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    },

    verifyDarkMode: () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            set({ darkModeEnabled: true })
        } else {
            document.documentElement.classList.remove('dark');
            set({ darkModeEnabled: false })
        }
    },
}));

export default useThemeStore;