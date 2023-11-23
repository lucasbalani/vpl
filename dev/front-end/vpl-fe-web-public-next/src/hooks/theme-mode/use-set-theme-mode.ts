 

import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeModeState } from "../../states/theme-mode-state";

const useSetThemeMode = () => {
    const themeMode = useRecoilValue(themeModeState);
    const setThemeMode = useSetRecoilState(themeModeState);

    return () => {
        if (themeMode === 'light')
            setThemeMode('dark');
        else
            setThemeMode('light');
    }
}

export default useSetThemeMode;