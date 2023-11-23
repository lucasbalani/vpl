 

import { atom } from "recoil";
import { Menu } from "../models/menu";

export const menuState = atom<Menu[]>({
    key: 'menuState',
    default: [
        new Menu('Home', 'Página inicial da aplicação', '/', true),
        new Menu('Sobre', 'Página sobre a aplicação', '/about', true),
        new Menu('Marcas', 'Consulte todas as marcas disponíveis em nosso app', '/brands'),
        new Menu('Modelos', 'Consulte todas os modelos disponíveis em nosso app', '/models'),
        new Menu('Veículos', 'Consulte todas os veículos disponíveis em nosso app', '/vehicles')
    ]
});