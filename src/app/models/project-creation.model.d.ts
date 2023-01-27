import { budgetYearDetails } from "./budgetyear.model";

export interface projectCreationDetails {
    projectName: string;
    tenure: number;
    financialYear: number;
    tabs?: budgetYearDetails[]
}