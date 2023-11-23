import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Brand } from "../models/brand";
import { GlobalSearch } from "../models/global-search";

export default class SearchService {
    static myInstance: SearchService | null = null;

    static get instance() {
        return SearchService.myInstance ??= new SearchService();
    }

    async search(searchTerms?: string): Promise<GlobalSearch> {
        const response = await AppHttp.instance.get(`/vehicles/search?searchTerms=${searchTerms}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }
}