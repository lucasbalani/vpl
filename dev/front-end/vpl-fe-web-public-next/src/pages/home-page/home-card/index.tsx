 

import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Menu } from "../../../models/menu";
import { useRouter } from "next/navigation";

const HomeCard = (menu: Menu) => {
    const { text, route, description } = menu;

    const router = useRouter();

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={() => router.push(route)}>
                <CardContent sx={{ height: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {/* <FontAwesomeIcon icon={icon} /> */}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {text}
                                </Typography>}
                                secondary={<Typography gutterBottom variant="subtitle2" component="div">
                                    {description}
                                </Typography>} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HomeCard;