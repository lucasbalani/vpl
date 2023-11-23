import BrandsService from "../../services/brands-service";

const useListBrands = () => {
    return async () => {
        try {
            return await BrandsService.instance.list();
        } catch (error: any) {
            return [];
        }
    };
};

export default useListBrands;