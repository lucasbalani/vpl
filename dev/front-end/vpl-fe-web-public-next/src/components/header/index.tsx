import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Tooltip, Typography } from "@mui/material";
import useListMenuAll from "../../hooks/global-search-result/menu/use-list-menu-all";
import useSetThemeMode from "../../hooks/theme-mode/use-set-theme-mode";
import useThemeMode from "../../hooks/theme-mode/use-theme-mode";
import Link from "next/link";

const Header = () => {
    const themeMode = useThemeMode();
    const setThemeMode = useSetThemeMode();
    const menus = useListMenuAll();

    return (
        <AppBar component="header">
            <Toolbar component="nav">
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    VPL
                </Typography>
                <Box>
                    <Tooltip title={themeMode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
                        <Button sx={{ color: '#fff' }} onClick={setThemeMode}>
                            {themeMode === 'dark' && <LightMode />}
                            {themeMode === 'light' && <DarkMode />}
                        </Button>
                    </Tooltip>

                    {menus.map((menu) => (
                        <Link key={menu.route.toString()} legacyBehavior href={menu.route}>
                            <Button sx={{ color: '#fff' }}>{menu.text}</Button>
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;