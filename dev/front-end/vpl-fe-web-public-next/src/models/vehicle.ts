import { VehicleType } from "./model";

export class Vehicle {
    id!: number;
    name!: string;
    brandName!: string;
    brandLogo!: string;
    brandId!: number;
    model!: string;
    modelId!: number;
    productionYear!: number;
    modelYear!: number;
    type!: VehicleType;
}