import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Model } from "../models/model";

export default class ModelsService {
    static myInstance: ModelsService | null = null;

    static get instance() {
        return ModelsService.myInstance ??= new ModelsService();
    }

    async list(): Promise<Model[]> {
        const response = await AppHttp.instance.get('/vehicles/models');

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }

    async listByBrandId(brandId: number): Promise<Model[]> {
        const response = await AppHttp.instance.get(`/vehicles/models/brand/${brandId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };

    async find(id: number): Promise<Model> {
        const response = await AppHttp.instance.get(`/vehicles/models/${id}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }
}