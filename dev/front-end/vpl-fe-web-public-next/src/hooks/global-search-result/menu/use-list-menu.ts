 ;

import { useRecoilValue } from "recoil"
import { menuState } from "../../../states/menu-state";

const useListMenu = () => {
    const menus = useRecoilValue(menuState);
    const menusFiltered = menus.filter(x => !x.onlyMenu);

    return menusFiltered;
}

export default useListMenu;