import BrandsPage from "../../src/pages/brands-page";
import useListBrands from "../../src/hooks/brand/use-list-brands";

export const getServerSideProps = async () => {
    const listBrands = useListBrands();
    const brandsResult = await listBrands();

    return { props: { brandsResult: brandsResult } };
}

export default BrandsPage;