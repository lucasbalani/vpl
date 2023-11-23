import { ApiResult } from "../../models/api-result-model";
import { Vehicle } from "../../models/vehicle";
import VehiclesService from "../../services/vehicles-service";

const useListVehicles = () => {
    return async () => {
        try {
            const data = await VehiclesService.instance.list();
            return ApiResult.success<Vehicle[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListVehicles;