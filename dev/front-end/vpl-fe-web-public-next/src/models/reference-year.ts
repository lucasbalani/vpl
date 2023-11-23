import { PriceReference } from "../enums/price-reference.enum";

export interface ReferenceYear {
    id: number;
    year: number;
    priceReference: PriceReference;
}