import { Model } from "../../models/model";
import ModelsService from "../../services/models-service";

const useListModels = () => {
    return async (): Promise<Model[]> => {
        try {
            return await ModelsService.instance.list();
        } catch (error: any) {
            return [];
        }
    };  
};

export default useListModels;