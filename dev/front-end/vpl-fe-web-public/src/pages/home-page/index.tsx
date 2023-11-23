'use client'

import { Search } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import useGlobalSearchResult from "../../hooks/global-search-result/use-global-search-result";
import useSetGlobalSearchResult from "../../hooks/global-search-result/use-set-global-search-result";
import useListMenu from "../../hooks/menu/use-list-menu";
import useGlobalSearch from "../../hooks/search/use-global-search";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Brand } from "../../models/brand";
import { GlobalSearchTerms } from "../../models/global-search-terms";
import { Model } from "../../models/model";
import { Vehicle } from "../../models/vehicle";
import BrandCard from "../brands-page/brand-card";
import ModelCard from "../models-page/model-card";
import HomeCard from "./home-card";
import useTablesMenu from "../../hooks/menu/use-tables-menu";
import SEO from "../../components/seo";
import VehicleCard from "../vehicles-page/Vehicle-card";

const HomePage = () => {
    const menus = useListMenu();
    const menusTables = useTablesMenu();
    const globalSearch = useGlobalSearch();
    const setGlobalSearchResult = useSetGlobalSearchResult();
    const { globalSearchTerms, globalSearchResult } = useGlobalSearchResult();
    const { register, handleSubmit, formState: { errors } } = useForm<GlobalSearchTerms>({
        defaultValues: {
            terms: globalSearchTerms.terms
        }
    });

    const search: SubmitHandler<GlobalSearchTerms> = async (globalSearchTerms) => {
        setGlobalSearchResult(globalSearchTerms, ApiResult.start());
        setGlobalSearchResult(globalSearchTerms, await globalSearch(globalSearchTerms.terms));
    };

    return (
        <>
            <SEO title="Página Inicial"
                description="Saiba tudo sobre os preços dos veículos."
                keywords="fipe, molicar, chevrolet, carro" />

            {/* Banner principal */}
            <Box sx={{ position: 'relative' }}>
                <img
                    src="https://img.freepik.com/free-photo/headlights-hood-black-luxury-car_146671-19730.jpg?w=2000&t=st=1675429365~exp=1675429965~hmac=1d04f800a883d9fd6bb211ea2cb5ae04c820ba5624751e1d915f8705bb1be092"
                    alt="Banner principal com um carro"
                    style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                        position: 'absolute',
                        zIndex: -1
                    }} />

                <Box sx={{
                    px: 3,
                    mb: 3,
                    width: '100%',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h1" component="h1" color="white" sx={{ textShadow: '1px 1px 4px black' }}>Home</Typography>
                    <Typography variant="h5" component="p" color="white" sx={{ textShadow: '1px 1px 4px black', textAlign: 'center' }}>Consulte todas as marcas, modelos, veículos e seu histórico de valor de mercado através do app VPL.</Typography>
                </Box>
            </Box>

            {/* Pesquisa */}
            <Typography variant="h4" component="h2" sx={{ mb: 3, mt: 10, textAlign: 'center' }}>Pesquise uma marca, modelo ou veículo:</Typography>
            <Box component="form" onSubmit={handleSubmit(search)} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TextField
                    {...register('terms', { required: 'Este campo é obrigatório', minLength: { value: 3, message: 'Sua pesquisa deve possuir ao menos 3 caracteres' } })}
                    type="search"
                    label="Digite sua pesquisa..."
                    helperText={errors.terms?.message}
                    error={!!errors.terms}
                    fullWidth
                    InputProps={{
                        endAdornment:
                            <>
                                {globalSearchResult.status === ApiResultStatus.loading ||
                                    globalSearchResult.status === ApiResultStatus.error ||
                                    globalSearchResult.status === ApiResultStatus.success &&
                                    <>
                                        <IconButton type="reset" edge="end" onClick={() => { setGlobalSearchResult(globalSearchTerms, ApiResult.setNone()) }}>
                                            <Cancel />
                                        </IconButton>
                                    </>}
                                <IconButton type="submit" edge="end">
                                    <Search />
                                </IconButton>
                            </>

                    }}
                />

            </Box>

            {globalSearchResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {globalSearchResult.status === ApiResultStatus.error && <p>Erro: {globalSearchResult.errorMessage}</p>}

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.brands?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Marcas encontradas:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.brands.map((brand: Brand) => (
                            <Grid item key={brand.id} xs={12} lg={6}>
                                <BrandCard {...brand} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.models?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Modelos encontrados:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.models.map((model: Model) => (
                            <Grid item key={model.id} xs={12} lg={6}>
                                <ModelCard {...model} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.vehicles?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Veículos encontrados:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.vehicles.map((vehicle: Vehicle) => (
                            <Grid item key={vehicle.id} xs={12} lg={6}>
                                <VehicleCard vehicle={vehicle}
                                             modelId={vehicle.modelId}
                                             brandId={vehicle.brandId} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && !globalSearchResult.data.brands?.length && !globalSearchResult.data.models?.length && !globalSearchResult.data.vehicles?.length && <p>:( Nenhum registro econtrado</p>}

            {/* Cards pré definidos */}
            <Divider />
            <Typography variant="h4" component="h2" sx={{ mb: 3, mt: 10, textAlign: 'center' }}>Selecione uma das opções a seguir:</Typography>
            <Grid container spacing={3} sx={{ mb: 10 }}>
                {menus.map((menu) => (
                    <Grid item key={menu.route.toString()} xs={12} sm={6} md={4}>
                        <HomeCard {...menu} />
                    </Grid>
                ))}
            </Grid>

            <Divider />

            <Typography variant="h4" component="h2" sx={{ mb: 3, mt: 10, textAlign: 'center' }}>Selecione uma das tabelas a seguir:</Typography>
            <Grid container spacing={3} sx={{ mb: 10 }}>
                {menusTables.map((menu) => (
                    <Grid item key={menu.route.toString()} xs={12} sm={6} md={4}>
                        <HomeCard {...menu} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default HomePage;