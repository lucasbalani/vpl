import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useFindBrand from "../../hooks/brand/use-find-brand";
import useListModels from "../../hooks/model/use-list-models";
import useListModelsByBrandId from "../../hooks/model/use-list-models-by-brand-id";
import ModelsList from "./models-list";
import SEO from "../../components/seo";
import { useSearchParams } from "next/navigation";
import { Model } from "../../models/model";
import { Brand } from "../../models/brand";

interface ModelsPageProps {
    modelsResult: Model[];
    brandResult: Brand | null;
}

const ModelsPage = ({ modelsResult, brandResult }: ModelsPageProps) => {
    // const [modelsResult, setModelsResult] = useState<ApiResult>(ApiResult.start());
    // const [brandResult, setBrandResult] = useState<ApiResult>(ApiResult.start());

    const searchParams = useSearchParams();
    const brandId = searchParams?.get('brandId');

    const state = null;
    // TODO: Ajustar aqui
    // const { state } = useLocation();


    const listModels = useListModels();
    const listModelsByBrandId = useListModelsByBrandId();
    const findBrand = useFindBrand();

    // const fetchData = async () => {
    //     if (brandId && state)
    //         setModelsResult(await listModelsByBrandId(parseInt(brandId)));
    //     else if (brandId) {
    //         setBrandResult(await findBrand(parseInt(brandId)));
    //         setModelsResult(await listModelsByBrandId(parseInt(brandId)));
    //     }
    //     else
    //         setModelsResult(await listModels());
    // };

    // useEffect(() => {
    //     if (modelsResult.status === ApiResultStatus.loading)
    //         fetchData();
    // });

    if (state) {
        const { brandName, brandLogo } = state;

        return (
            <>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <SEO title="Modelos"
                        description="Confira a relação de modelos que controlamos o valor de mercado"
                        keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h1">Modelos</Typography>
                        <Typography variant="h6" component="p">
                            Encontre o modelo do seu novo veículo da marca <strong>{brandName}</strong>,
                            <br />
                            clique sobre ele para ver todos os veículo disponíveis.
                        </Typography>
                    </Box>
                    <Avatar
                        src={brandLogo}
                        alt={brandName}
                        sx={{
                            width: 120,
                            height: 120
                        }}>
                        <Typography variant="h4">{brandName[0]}</Typography>
                    </Avatar>
                </Box>

                <ModelsList modelsResult={modelsResult} />

            </>
        )
    } else if (brandId) {
        return (
            <>
                <SEO title="Modelos"
                    description="Confira a relação de modelos que controlamos o valor de mercado"
                    keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />

                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h1">Modelos</Typography>
                        <Typography variant="h6" component="p">
                            Encontre o modelo do seu novo veículo da marca <strong>{brandResult?.name}</strong>,
                            <br />
                            clique sobre ele para ver todos os veículo disponíveis.
                        </Typography>
                    </Box>
                    <Avatar
                        src={brandResult?.logo}
                        alt={brandResult?.name}
                        sx={{
                            width: 120,
                            height: 120
                        }}>
                        <Typography variant="h4">{brandResult?.name[0]}</Typography>
                    </Avatar>
                </Box>

                <ModelsList modelsResult={modelsResult} />

            </>
        )
    } else {
        return (
            <>
                <SEO title="Modelos"
                    description="Confira a relação de modelos que controlamos o valor de mercado"
                    keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />

                <Box sx={{ mb: 5 }}>
                    <Typography variant="h1" component="h1">Modelos</Typography>
                    <Typography variant="h6" component="p">
                        Encontre o modelo do seu novo veículo,
                        <br />
                        clique sobre ele para ver todos os veículo disponíveis.
                    </Typography>
                </Box>

                <ModelsList modelsResult={modelsResult} />

            </>
        )
    }
}

export default ModelsPage;