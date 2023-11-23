import ModelsService from "../../services/models-service";

const useListModelsByBrandId = () => {
    return async (brandId: number) => {
        try {
            return await ModelsService.instance.listByBrandId(brandId);
        } catch (error: any) {
            return [];
        }
    };
};

export default useListModelsByBrandId;