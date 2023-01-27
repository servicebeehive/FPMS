import { budgetYearDetails } from "./budgetyear.model";
import { projectDetails } from "./project-details.model";

export interface projectHeaderDetails extends projectDetails {
    budgetyear?: budgetYearDetails[];
}