import { Brand } from "../../models/brand";
import BrandsService from "../../services/brands-service";

const useFindBrand = () => {
    return async (id: number): Promise<Brand | null> => {
        try {
            return await BrandsService.instance.find(id);
        } catch (error) {
            return null;
        }
    };
};

export default useFindBrand;