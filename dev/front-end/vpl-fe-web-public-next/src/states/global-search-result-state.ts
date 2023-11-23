 

import { atom } from "recoil";
import { ApiResult } from "../models/api-result-model";

export const globalSearchResultState = atom<ApiResult>({
    key: 'globalSearchResultState',
    default: new ApiResult()
});