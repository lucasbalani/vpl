export class Menu {
    text: string;
    description: string;
    route: string;
    onlyMenu: boolean;

    constructor(text: string, description: string, route: string, onlyMenu: boolean = false) {
        this.text = text;
        this.description = description;
        this.route = route;
        this.onlyMenu = onlyMenu;
    }
}