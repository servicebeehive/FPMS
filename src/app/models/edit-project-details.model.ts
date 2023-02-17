import { budgetYearDetails } from "./budgetyear.model"
import { componentDetails } from "./project-component-details.model"
import { projectDetails } from "./project-details.model"

export interface editProjectDetails {
    projectcomponent: componentDetails,
    projectdetails: projectDetails,
    projectworkflow: [],
    projectyearbudget: budgetYearDetails[]
}