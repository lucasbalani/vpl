import { DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChartComponent from "../../../components/chart";
import { PriceReference } from "../../../enums/price-reference.enum";
import useListEvaluationsByVehicleId from "../../../hooks/evaluation/use-list-evaluations-by-vehicle-id";
import { EvaluationPriceReference } from "../../../models/EvaluationPriceReference";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { VehicleType } from "../../../models/model";
import VehiclePriceReferenceTable from "../vehicle-price-reference-table";
import { NumericFormat } from 'react-number-format';
import { useSearchParams } from "next/navigation";

enum Flows {
    BrandModel,
    PriceYear,
    Default
}

const VehicleDetailsDefault = ({ vehicle, evaluationsFipe, evaluationsMolicar }: EvaluationPriceReference) => {
    const { name, type, modelYear, productionYear, model } = vehicle;

    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const year = searchParams?.get('year');

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={'teste'}
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                        </Box>
                    </Grid>
                    <Divider />
                </Grid>
            </Card>

            {evaluationsFipe.length == 0 && evaluationsMolicar.length == 0 &&
                <Typography variant='h4' component='h4' sx={{ textAlign: 'center', mt: 4 }} >Não há avaliações !</Typography>
            }

            {evaluationsFipe.length > 0 &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="FIPE"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsFipe} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsFipe} priceReference={PriceReference.Fipe} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

            {evaluationsMolicar.length > 0 &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="Molicar"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsMolicar} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsMolicar} priceReference={PriceReference.Molicar} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

        </>
    );
}

const VehicleDetailsBrandModel = ({ vehicle, evaluationsFipe, evaluationsMolicar }: EvaluationPriceReference) => {
    const { name, type, modelYear, productionYear, model, brandLogo } = vehicle;

    const searchParams = useSearchParams();
    const vehicleId = searchParams?.get('vehicleId');
    const year = searchParams?.get('year');

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
                <Avatar
                    src={brandLogo}
                    sx={{
                        width: 120,
                        height: 120
                    }}>
                </Avatar>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={'teste'}
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            {evaluationsFipe.length == 0 && evaluationsMolicar.length == 0 &&
                <Typography variant='h4' component='h4' sx={{ textAlign: 'center', mt: 4 }} >Não há avaliações !</Typography>
            }

            {evaluationsFipe.length > 0 &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="FIPE"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsFipe} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsFipe} priceReference={PriceReference.Fipe} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

            {evaluationsMolicar.length > 0 &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="Molicar"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsMolicar} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsMolicar} priceReference={PriceReference.Molicar} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
        </>
    );
}

const VehicleDetailsPriceYear = ({ vehicle, evaluationsFipe, evaluationsMolicar }: EvaluationPriceReference) => {
    const { name, type, modelYear, productionYear, model } = vehicle;

    const searchParams = useSearchParams();
    const vehicleId = searchParams?.get('vehicleId');
    const priceReference = searchParams?.get('priceReference');
    const year = searchParams?.get('year');

    const valueInYear = parseInt(priceReference!) === PriceReference.Fipe ?
        evaluationsFipe.find(x => x.year === parseInt(year!))?.value :
        evaluationsMolicar.find(x => x.year === parseInt(year!))?.value;

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Box>
                                <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant='overline' component='small'>Valor no Ano</Typography>
                        </Box>
                        <Box>
                            <Chip color="primary" label={year} sx={{ mr: 1 }} /><Typography variant='body1' component='strong'>
                                <NumericFormat value={valueInYear} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} prefix={'R$'} />

                            </Typography>
                        </Box>
                    </Grid>
                    <Divider />
                </Grid>
            </Card>

            {parseInt(priceReference!) === PriceReference.Fipe &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="FIPE"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsFipe} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsFipe} priceReference={PriceReference.Fipe} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

            {parseInt(priceReference!) === PriceReference.Molicar &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="Molicar"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable evaluations={evaluationsMolicar} yearSelect={parseInt(year!)} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent evaluations={evaluationsMolicar} priceReference={PriceReference.Molicar} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
        </>
    );
}

function getPriceReference(value: Number) {
    const type = value as PriceReference;

    switch (type) {
        case PriceReference.Fipe:
            return 'FIPE'
        case PriceReference.Molicar:
            return 'MOLICAR'
        default:
            return 'INDEFINIDO'
    }
}

function getTypeVehicle(value: Number) {
    const type = value as VehicleType;

    switch (type) {
        case VehicleType.Car:
            return 'CARRO'
        case VehicleType.Bus:
            return 'ÔNIBUS'
        case VehicleType.Moto:
            return 'MOTO'
        case VehicleType.Van:
            return 'VAN'
        case VehicleType.Truck:
            return 'CARRETA'
        default:
            return 'INDEFINIDO'
    }
}

function getAvatarVehicle(value: Number, name: string) {
    const type = value as VehicleType;

    switch (type) {
        case VehicleType.Car:
            return (<DirectionsCar style={{ fontSize: 48 }} />);
        case VehicleType.Moto:
            return (<TwoWheeler style={{ fontSize: 48 }} />);
        default:
            return (<Typography variant="h4">{name[0]}</Typography>);
    }
}

function getFlow(modelId: any, brandId: any,
    priceReference: any, year: any) {

    return modelId && brandId ? Flows.BrandModel :
        priceReference && year ? Flows.PriceYear :
            Flows.Default
}

const VehicleDetails = () => {
    const [evaluationsResult, setEvaluationsResult] = useState<ApiResult>(ApiResult.start());

    const searchParams = useSearchParams();
    const vehicleId = searchParams?.get('vehicleId');
    const modelId = searchParams?.get('modelId');
    const brandId = searchParams?.get('brandId');
    const priceReference = searchParams?.get('priceReference');
    const year = searchParams?.get('year');

    const flow = getFlow(modelId, brandId, priceReference, year);

    const listEvaluationsByVehicleId = useListEvaluationsByVehicleId();

    const fetchData = async () => {
        setEvaluationsResult(await listEvaluationsByVehicleId(parseInt(vehicleId!), priceReference ? parseInt(priceReference!) : null));
    };

    useEffect(() => {
        if (evaluationsResult.status === ApiResultStatus.loading)
            fetchData();
    })

    let renderFlow: JSX.Element;

    switch (flow) {
        case Flows.BrandModel:
            renderFlow = <VehicleDetailsBrandModel {...evaluationsResult.data} />;
            break;
        case Flows.PriceYear:
            renderFlow = <VehicleDetailsPriceYear {...evaluationsResult.data} />;
            break;
        default:
            renderFlow = <VehicleDetailsDefault {...evaluationsResult.data} />
            break;
    }

    return (
        <>
            {evaluationsResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {evaluationsResult.status === ApiResultStatus.error && <p>{evaluationsResult.errorMessage ?? '-'}</p>}
            {evaluationsResult.status === ApiResultStatus.success && renderFlow}
        </>
    );
}

export default VehicleDetails;