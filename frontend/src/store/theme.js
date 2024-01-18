import { create } from 'zustand';

const useThemeStore = create((set) => ({
    darkModeEnabled: false,
    currentFont : "font-poppins",
    siteFonts : ["font-poppins", "font-roboto", "font-sans", "font-serif"],
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

    changeFont: (font) => {
        set({ currentFont: font })
        localStorage.font = font;
        var fonts = ["font-poppins", "font-roboto", "font-sans", "font-serif"];
        for(var i=0; i<fonts.length; i++ ){
            document.documentElement.classList.remove(fonts[i]);
        }
        document.documentElement.classList.add(font);
    },

    verifyFont: () => {
        if(localStorage.font){
            set({ currentFont: localStorage.font })
            document.documentElement.classList.add(localStorage.font);
        }else{
            document.documentElement.classList.add("font-poppins")
        }
    }
}));

export default useThemeStore;