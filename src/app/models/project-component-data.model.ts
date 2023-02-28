import { budgetYearDetails } from "./budgetyear.model";
import { createProjectComponent } from "./create-project-component.model";

export interface projectComponentData {
    planYearAmount: budgetYearDetails,
    headercomponentid: number,
    actionType?: string,
    componentDetails?: createProjectComponent,
}