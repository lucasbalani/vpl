import { AxiosResponse, HttpStatusCode } from "axios";
import { PriceReference } from "../enums/price-reference.enum";
import AppHttp from "../http/app-http";
import { Evaluation } from "../models/evaluation";
import { EvaluationPriceReference } from "../models/EvaluationPriceReference";

export default class EvaluationsService {
    static myInstance: EvaluationsService | null = null;

    static get instance() {
        return EvaluationsService.myInstance ??= new EvaluationsService();
    }

    async listByVehicleId(vehicleId: number, priceReference: PriceReference | null): Promise<EvaluationPriceReference> {
        let response: AxiosResponse<any, any>;

        if (priceReference)
            response = await AppHttp.instance.get(`/prices/evaluations/listById/${vehicleId}/${priceReference}`);
        else
            response = await AppHttp.instance.get(`/prices/evaluations/listById/${vehicleId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };
}