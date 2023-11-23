import { ApiResult } from "../../models/api-result-model";
import { GlobalSearch } from "../../models/global-search";
import SearchService from "../../services/search-service";

const useGlobalSearch = () =>{
    return async (searchTerms?: string) => {
        try {
            const data = await SearchService.instance.search(searchTerms);
            return ApiResult.success<GlobalSearch>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useGlobalSearch;