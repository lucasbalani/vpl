import { ApiResult } from "../../models/api-result-model";
import { Model } from "../../models/model";
import ModelsService from "../../services/models-service";

const useFindModel = () => {
    return async (id: number) => {
        try {
            const data = await ModelsService.instance.find(id);
            return ApiResult.success<Model>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useFindModel;