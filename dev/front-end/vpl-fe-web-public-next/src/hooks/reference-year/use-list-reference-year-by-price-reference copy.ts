import { PriceReference } from "../../enums/price-reference.enum";
import { ApiResult } from "../../models/api-result-model";
import { ReferenceYear } from "../../models/reference-year";
import { ReferenceYearService } from "../../services/reference-year.service";

const useListReferenceYearByPriceReference = () =>{
    return async (priceReference: PriceReference) => {
        try {
            const data = await ReferenceYearService.instance.listByPriceReference(priceReference);
            return ApiResult.success<ReferenceYear[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListReferenceYearByPriceReference;