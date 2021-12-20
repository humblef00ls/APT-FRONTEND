// import { doc } from "prettier";
import { config } from "../stores.js";
export function setColors(lightMode) {
    console.log("setColors: lightMode = " + lightMode);
    const vals = config.setup.theme
    document.documentElement.style.setProperty('--back',  lightMode ? vals.back : vals.back_d );
        document.documentElement.style.setProperty('--text',  lightMode ? vals.text : vals.text_d );
        document.documentElement.style.setProperty('--text-inv',  lightMode ? vals.text_inv : vals.text_inv_d );
        document.documentElement.style.setProperty('--accent',  lightMode ? vals.accent : vals.accent_d );
        document.documentElement.style.setProperty('--section',  lightMode ? vals.section : vals.section_d );
        if (lightMode) {
            document.documentElement.style.setProperty('--section-f', vals.section_f );
        }
        else {
            document.documentElement.style.setProperty('--section-f',  vals.section_f_d );
        }

    window.localStorage.setItem('lightMode', JSON.stringify(lightMode));


 }
