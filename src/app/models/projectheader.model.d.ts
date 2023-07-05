import { budgetYearDetails } from "./budgetyear.model";
import { projectDetails } from "./project-details.model";
import { compenentDetails } from "./state-per-hec-details.model";

export interface projectHeaderDetails extends projectDetails {
    budgetyear?: budgetYearDetails[];
    projecttask?:compenentDetails[];
}