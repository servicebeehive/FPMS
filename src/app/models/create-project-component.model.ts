export interface createProjectComponent {
    componentid?: number,
    projectheadid?: number,
    year?: string,
    sorno?: string,
    workdetail?: string,
    quantity?: number,
    uom?: string,
    rate?: number,
    amount?: number,
    geolocation?: string,
    materialreq?: boolean,
    startdate?: string,
    enddate?: string,
    isheader?: boolean,
    headercomponentid?: number,
    operationtype?: string
    yearbudgetid?: number
    planyear?: string
    laborcostconsumed?: number
    materialcostconsumed?: number
    remainingbuget?: number
    carryforwardcomponentid?: number
    iscarryforward?: boolean
    carryforwardamt?: number
    totalamount?: number
    isExpand?: boolean
    project_id?:number

}