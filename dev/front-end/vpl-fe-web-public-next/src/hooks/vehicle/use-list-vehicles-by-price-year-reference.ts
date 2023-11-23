import { PriceReference } from "../../enums/price-reference.enum";
import { ApiResult } from "../../models/api-result-model";
import { Vehicle } from "../../models/vehicle";
import VehiclesService from "../../services/vehicles-service";

const useListVehiclesByPriceYearReference = () => {
    return async (priceReference: PriceReference, year: Number) => {
        try {
            const data = await VehiclesService.instance.listByPriceYearReference(priceReference, year);
            return ApiResult.success<Vehicle[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListVehiclesByPriceYearReference;