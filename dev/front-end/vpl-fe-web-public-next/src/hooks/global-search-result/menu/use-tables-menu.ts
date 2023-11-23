 

import { useRecoilValue } from "recoil"
import { menuTablesState } from "../../../states/menu-tables-state";

const useTablesMenu = () => {
    const menus = useRecoilValue(menuTablesState);
    const menusFiltered = menus.filter(x => !x.onlyMenu);

    return menusFiltered;
}

export default useTablesMenu;