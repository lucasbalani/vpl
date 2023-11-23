import { HttpStatusCode } from "axios";
import { PriceReference } from "../enums/price-reference.enum";
import AppHttp from "../http/app-http";
import { ReferenceYear } from "../models/reference-year";

export class ReferenceYearService {
    static _instance: ReferenceYearService;

    static get instance() {
        return ReferenceYearService._instance ??= new ReferenceYearService();
    }

    async listByPriceReference(priceReference: PriceReference): Promise<ReferenceYear[]> {
        const response = await AppHttp.instance.get(`/prices/referenceYears/priceReference/${priceReference}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }
}