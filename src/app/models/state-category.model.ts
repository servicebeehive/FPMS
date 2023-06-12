export interface stateCategoryDetails {
    state_category_data: stateCategoryData[];
}

export interface stateCategoryData {
    statetaskcategoryid: number,
    statetaskcategoryname: string
}

export interface stateProjectWorkDetails {
    state_category_data: stateProjectWorkData[];
}

export interface stateProjectWorkData {
    statetaskid: number,
    statetaskdesc: string
}