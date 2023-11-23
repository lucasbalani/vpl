import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Vehicle } from "../models/vehicle";
import { PriceReference } from "../enums/price-reference.enum";

export default class VehiclesService {
    static myInstance: VehiclesService | null = null;

    static get instance() {
        return VehiclesService.myInstance ??= new VehiclesService();
    }

    async list(): Promise<Vehicle[]> {
        const response = await AppHttp.instance.get('/vehicles/vehicles');

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }

    async listByPriceYearReference(priceReference: PriceReference, year: Number): Promise<Vehicle[]> {
        const response = await AppHttp.instance.get(`/vehicles/vehicles/${priceReference}/${year}`);
        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }

    async listByModelId(brandId: number): Promise<Vehicle[]> {
        const response = await AppHttp.instance.get(`/vehicles/vehicles/model/${brandId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };

    async find(id: number): Promise<Vehicle> {
        const response = await AppHttp.instance.get(`/vehicles/vehicles/${id}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };
}