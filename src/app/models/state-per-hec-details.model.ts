import { projectDetails } from "./project-details.model"

export interface statePerHecDataDetails {
    per_ht_data: compenentDetailData,
    calculated_ht_data: compenentDetailData,
    project_year_data: projectYearData[],
    project_header_data?:projectDetails[]
};

export interface compenentDetailData {
    first?: compenentDetails[],
    second?: compenentDetails[],
    third?: compenentDetails[],
    fourth?: compenentDetails[],
    fifth?: compenentDetails[],
    sixth?: compenentDetails[],
    seventh?: compenentDetails[],
    eighth?: compenentDetails[],
    ninth?: compenentDetails[],
    tenth?: compenentDetails[]
};

export interface compenentDetails {
    statetaskid: number,
    taskdesc: string,
    tasksequance: number,
    taskyear: number,
    quantity: number,
    qty_uom: string,
    rate: number,
    rate_uom: string,
    maxexpd: string,
    isheader: boolean,
    materialreq: boolean,
    startdate: string,
    enddate: string
};

export interface projectYearData {
    taskyear: number,
    case: string
};