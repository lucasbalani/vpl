import { ApiResult } from "../../models/api-result-model";
import { Model } from "../../models/model";
import { Vehicle } from "../../models/vehicle";
import ModelsService from "../../services/models-service";
import VehiclesService from "../../services/vehicles-service";

const useListVehiclesByModelId = () => {
    return async (modelId: number) => {
        try {
            const data = await VehiclesService.instance.listByModelId(modelId);
            return ApiResult.success<Vehicle[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListVehiclesByModelId;