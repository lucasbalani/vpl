import { Grid } from "@mui/material";
import { Model } from "../../../models/model";
import ModelCard from "../model-card";

export interface ModelsListProps {
    modelsResult: Model[];
}

const ModelsList = ({ modelsResult }: ModelsListProps) => {
    return (
        <>
            {!modelsResult?.length && <p>:( Nenhum Registro Encontrado</p>}

            <Grid container spacing={1} sx={{ my: 3 }}>
                {modelsResult?.map((model: Model) => (
                    <Grid item key={model.id} xs={12} lg={6}>
                        <ModelCard {...model} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ModelsList;