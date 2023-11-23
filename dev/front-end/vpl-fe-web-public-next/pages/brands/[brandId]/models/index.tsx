import useFindBrand from "../../../../src/hooks/brand/use-find-brand";
import useListModelsByBrandId from "../../../../src/hooks/model/use-list-models-by-brand-id";
import ModelsPage from "../../../models";

export const getServerSideProps = async ({ params }) => {
    if (!params?.brandId)
        return {
            redirect: {
                permanent: false,
                destination: '/not-found'
            }       
        };

    const listModelsByBrandId = useListModelsByBrandId();
    const findBrand = useFindBrand();

    const brandResult = await findBrand(params.brandId);

    console.log(brandResult);


    if (!brandResult)
        return {
            redirect: {
                permanent: false,
                destination: '/not-found'
            }
        };

    const modelsResult = await listModelsByBrandId(params.brandId);

    return { props: { modelsResult, brandResult } };
}

export default ModelsPage;