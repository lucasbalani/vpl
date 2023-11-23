export enum VehicleType {
    Car = 1,
    Moto = 2,
    Bus = 3,
    Truck = 4,
    Van = 5
}

export class Model {
    id!: number;
    brandId!: number;
    brandName!: string;
    brandLogo?: string;
    name!: string;
    description!: string;
    type!: VehicleType;
    productionStart!: Date;
    productionEnd?: Date;
    productionEnded!: boolean;
}