import { budgetYearDetails } from "./budgetyear.model";
import { componentDetails } from "./project-component-details.model";
import { projectDetails } from "./project-details.model"
import { projectWorkFlow } from "./projectworkflow-details.model";

export interface summaryDeatils {
    projectcomponent: componentDetails[];
    projectdetails: projectDetails;
    projectworkflow: projectWorkFlow[];
    projectyearbudget: budgetYearDetails[];
    projectyeardata: budgetYearDetails[];
}