 

import { useRecoilValue } from "recoil";
import { menuState } from "../../../states/menu-state";

const useListMenuAll = () => {
    const menus = useRecoilValue(menuState);

    return menus;
};

export default useListMenuAll;