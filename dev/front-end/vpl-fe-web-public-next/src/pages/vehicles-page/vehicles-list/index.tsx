import { Grid } from "@mui/material";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { Vehicle } from "../../../models/vehicle";
import VehicleCard from "../Vehicle-card";

export interface VehiclesListProps {
    vehiclesResult: ApiResult;
    yearReference?: Number;
    priceReference?: Number;
    modelId?: Number;
    brandId?: Number;
}

const VehiclesList = ({ vehiclesResult, yearReference, priceReference, modelId, brandId }: VehiclesListProps) => {
    
    return (
        <>
            {vehiclesResult?.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {vehiclesResult?.status === ApiResultStatus.error && <p>Erro: {vehiclesResult.errorMessage}</p>}

            {vehiclesResult?.status === ApiResultStatus.success && vehiclesResult.data.length > 0 &&
                <Grid container spacing={1} sx={{ my: 3 }}>
                    {vehiclesResult.data.map((vehicle: Vehicle) => (
                        <Grid item key={vehicle.id} xs={12} lg={6}>
                            <VehicleCard vehicle={vehicle} 
                                         year={yearReference} 
                                         priceReference={priceReference}
                                         modelId={modelId}
                                         brandId={brandId}/>
                        </Grid>
                    ))}
                </Grid>
            }

            {vehiclesResult?.status === ApiResultStatus.success && vehiclesResult.data.length === 0 &&
                <p>:( Nenhum Registro Encontrado</p>
            }
        </>
    );
};

export default VehiclesList;