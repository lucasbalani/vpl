import { Chip, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import react, { useEffect, useState } from "react";
import { PriceReference } from "../../enums/price-reference.enum";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import useListReferenceYearByPriceReference from "../../hooks/reference-year/use-list-reference-year-by-price-reference";
import { ReferenceYear } from "../../models/reference-year";
import { ChevronRight } from "@mui/icons-material";
import SEO from "../../components/seo";
import { useRouter, useSearchParams } from "next/navigation";

const ReferencesPage = () => {
    const [referenceYearsResult, setReferenceYearsResult] = useState<ApiResult>(ApiResult.start());

    const searchParams = useSearchParams();
    const table = searchParams?.get('table');

    const router = useRouter();
    const listReferenceYears = useListReferenceYearByPriceReference();

    const currentYear = new Date().getFullYear();

    const fetchData = async () => {
        setReferenceYearsResult(await listReferenceYears(table as any));
    };

    useEffect(() => {
        if (referenceYearsResult.status === ApiResultStatus.loading)
            fetchData();
    });

    let tableName: string | null = null;

    useEffect(() => {
        if (!tableName) {
            router.back();
        }
    }, [tableName]);

    if (table) {
        const value: PriceReference = parseInt(table) as PriceReference;

        switch (value) {
            case PriceReference.Fipe:
                tableName = 'FIPE';
                break;
            case PriceReference.Molicar:
                tableName = 'Molicar';
                break;
            default:
                tableName = '';
                break;
        }
    }

    return (
        <>
            <SEO title="Referências"
                description="Confira a relação de referências que controlamos o valor de mercado"
                keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />
                
            <Typography variant="h1" component="h1">{tableName}</Typography>
            <Typography variant="h6" component="p" sx={{ mb: 3 }}>
                Selecione o ano de referência desejado
                <br />
                para listar os veículos disponíveis.
            </Typography>

            {referenceYearsResult.status === ApiResultStatus.loading &&
                <Typography>carregando...</Typography>
            }

            {referenceYearsResult.status === ApiResultStatus.error &&
                <Typography color="red">Erro: {referenceYearsResult.errorMessage}</Typography>
            }

            {referenceYearsResult.status === ApiResultStatus.success &&
                <Grid container>
                    <Grid item xs={12} md={8} lg={6}>
                        <List>
                            {referenceYearsResult.data.map((referenceYear: ReferenceYear) => (
                                <react.Fragment key={referenceYear.year}>
                                    <ListItemButton component="a" onClick={() => router.push(`/priceReference/${table}/year/${referenceYear.year}/vehicles`)} sx={{ py: 3 }} >
                                        <ListItemText primary={referenceYear.year} />
                                        {referenceYear.year === currentYear &&
                                            <ListItemText>
                                                <Chip color="primary" label="Ano Atual" />
                                            </ListItemText>
                                        }
                                        <ListItemIcon>
                                            <ChevronRight />
                                        </ListItemIcon>
                                    </ListItemButton>
                                    <Divider />
                                </react.Fragment>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default ReferencesPage;