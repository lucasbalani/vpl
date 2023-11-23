 

import { useRecoilValue } from "recoil";
import { themeModeState } from "../../states/theme-mode-state";

const useThemeMode = () => {
    const themeMode = useRecoilValue(themeModeState);
    return themeMode;
};

export default useThemeMode;