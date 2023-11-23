 

import { atom } from "recoil";
import { Menu } from "../models/menu";
import { PriceReference } from "../enums/price-reference.enum";

export const menuTablesState = atom<Menu[]>({
    key: 'menuTablesState',
    default: [
        new Menu('Fipe', 'Consulte as referências da tabela FIPE', `/references/${PriceReference.Fipe}`),
        new Menu('Molicar', 'Consulte as referências da tabela Molicar', `/references/${PriceReference.Molicar}`),
    ]
});