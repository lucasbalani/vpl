 

import { useSetRecoilState } from "recoil";
import { ApiResult } from "../../models/api-result-model";
import { GlobalSearchTerms } from "../../models/global-search-terms";
import { globalSearchResultState } from "../../states/global-search-result-state";
import { globalSearchState } from "../../states/global-search-state";

const useSetGlobalSearch = () => {
    const setGlobalSearch = useSetRecoilState(globalSearchState);
    const setGlobalSearchResult = useSetRecoilState(globalSearchResultState);

    return (globalSearch: GlobalSearchTerms, globalSearchResult: ApiResult) => {
        setGlobalSearch(globalSearch);
        setGlobalSearchResult(globalSearchResult);
    }
}

export default useSetGlobalSearch;