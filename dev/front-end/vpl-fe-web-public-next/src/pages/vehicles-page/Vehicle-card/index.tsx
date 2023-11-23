 

import { ChevronRight, DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Box } from "@mui/material";
import { VehicleType } from "../../../models/model";
import { Vehicle } from "../../../models/vehicle";
import { useRouter } from "next/navigation";

export interface VehicleCardListProps {
    vehicle: Vehicle;
    year?: Number;
    priceReference?: Number;
    modelId?: Number;
    brandId?: Number;
}

const VehicleCard = ({ vehicle, year, priceReference, modelId, brandId }: VehicleCardListProps) => {

    const router = useRouter();

    const goToVehicle = () => {

        if (year && priceReference)
            router.push(`/priceReference/${priceReference}/year/${year}/vehicle/details/${vehicle?.id}`);
        else if (brandId && modelId)
            router.push(`/brands/${brandId}/models/${modelId}/vehicle/details/${vehicle?.id}`);
        else
            router.push(`/vehicle/details/${vehicle?.id}`);

    };

    const VehicleTypeAvatar = () => {
        switch (vehicle?.type) {
            case VehicleType.Car:
                return (<DirectionsCar style={{ fontSize: 48 }} />);
            case VehicleType.Moto:
                return (<TwoWheeler style={{ fontSize: 48 }} />);
            default:
                return (<Typography variant="h4">{!!vehicle?.name ? vehicle.name[0] : ''}</Typography>);
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={goToVehicle}>
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
                                    <VehicleTypeAvatar />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText disableTypography
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {vehicle?.name}
                                </Typography>}
                                secondary={<>
                                    <Typography gutterBottom variant="subtitle2" component="div">
                                        {/* {description} */}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={vehicle?.brandLogo}
                                            alt={vehicle?.brandName}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                mr: 1
                                            }}>
                                            <Typography variant="h4">{!!vehicle?.brandName ? vehicle.brandName[0] : ''}</Typography>
                                        </Avatar>
                                        <Typography gutterBottom variant="subtitle2" component="div" sx={{ mb: 0 }}>
                                            {vehicle?.brandName}
                                        </Typography>
                                    </Box>
                                </>} />
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

export default VehicleCard;