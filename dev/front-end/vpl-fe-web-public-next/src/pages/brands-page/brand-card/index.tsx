 

import { ChevronRight } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Brand } from "../../../models/brand";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BrandCard = (props: Brand) => {
    const { id, name, logo } = props;
    const router = useRouter();

    const goToModel = () => {
        router.push(`/brands/${id}/models`);
        // TODO: Ajustar passagem de estado via rota
        // router.push(`/brands/${id}/models`, {
        //     state: {
        //         brandName: name,
        //         brandLogo: logo
        //     }
        // });
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={goToModel}>
                <CardContent sx={{ height: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mr: 3
                                    }}>
                                    {!!logo &&
                                        <Image src={logo} alt={name} width={80} height={80} style={{ objectFit: 'cover' }} />
                                        ||
                                        <Typography variant="h4">{!!name ? name[0] : ''}</Typography>
                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText disableTypography
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {name}
                                </Typography>}
                                secondary={<Typography gutterBottom variant="subtitle2" component="div">
                                    Clique para ver os modelos
                                </Typography>} />
                            <ChevronRight sx={{
                                fontSize: 48,
                                color: "grey.400"
                            }} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BrandCard;