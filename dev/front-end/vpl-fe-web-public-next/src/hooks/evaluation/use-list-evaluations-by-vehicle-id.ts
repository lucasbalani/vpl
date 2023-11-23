import { PriceReference } from "../../enums/price-reference.enum";
import { EvaluationPriceReference } from "../../models/EvaluationPriceReference";
import { ApiResult } from "../../models/api-result-model";
import EvaluationsService from "../../services/evaluations-service";

const useListEvaluationsByVehicleId = () => {
    return async (vehicleId: number, priceReference: PriceReference | null) => {
        try {
            const data = await EvaluationsService.instance.listByVehicleId(vehicleId, priceReference);
            return ApiResult.success<EvaluationPriceReference>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListEvaluationsByVehicleId;