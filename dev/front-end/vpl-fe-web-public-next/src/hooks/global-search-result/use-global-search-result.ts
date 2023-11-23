 

import { useRecoilValue } from "recoil";
import { globalSearchResultState } from "../../states/global-search-result-state";
import { globalSearchState } from "../../states/global-search-state";

const useGetGlobalSearch = () => {
    const globalSearchTerms = useRecoilValue(globalSearchState);
    const globalSearchResult = useRecoilValue(globalSearchResultState);

    return { globalSearchTerms, globalSearchResult };
};

export default useGetGlobalSearch;