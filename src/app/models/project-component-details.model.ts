import { createProjectComponent } from "./create-project-component.model"

export interface projectComponentDetails {
    projectcomponent: componentDetails[]
}

export interface componentDetails {
    componentelement: createProjectComponent[]
    componentheader: createProjectComponent
}