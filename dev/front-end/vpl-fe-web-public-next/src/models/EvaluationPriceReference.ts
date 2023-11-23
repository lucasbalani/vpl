import { Evaluation } from "./evaluation";
import { Vehicle } from "./vehicle";


export class EvaluationPriceReference {
    vehicle!: Vehicle;
    evaluationsFipe!: Evaluation[];
    evaluationsMolicar!: Evaluation[];
}