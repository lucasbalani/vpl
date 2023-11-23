 

import { atom } from "recoil";
import { GlobalSearchTerms } from "../models/global-search-terms";

export const globalSearchState = atom<GlobalSearchTerms>({
    key: 'globalSearchState',
    default: new GlobalSearchTerms()
});