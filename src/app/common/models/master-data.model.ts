import { beatDetails } from "src/app/models/beat-details.model";
import { budgetHeadDetails } from "src/app/models/budgethead-details.model";
import { compartmentDetails } from "src/app/models/compartment-details.model";
import { districtDetails } from "src/app/models/district-details.model";
import { divisionDetails } from "src/app/models/division-details.model"
import { financialYearDetails } from "src/app/models/financialyear-details.model";
import { rangeDetails } from "src/app/models/range-details.model";
import { roleDetails } from "src/app/models/role-details.model"
import { samitteeDetails } from "src/app/models/samittee-details.model";
import { schemeDetails } from "src/app/models/scheme-details.model";
import { statusDetails } from "src/app/models/status-details.model";
import { subdivisionDetails } from "src/app/models/subdivision-details.model";
import { tahsilDetails } from "src/app/models/tahsil-details.model";
import { vidhansabhaDetails } from "src/app/models/vidhansabha-details.model";
import { villageDetails } from "src/app/models/village-details.model";

export interface masterData {
    division: divisionDetails[];
    role: roleDetails[];
    financialyear: financialYearDetails[];
    subdivision: subdivisionDetails[];
    beat: beatDetails[];
    tahsil: tahsilDetails[];
    vidhansabha: vidhansabhaDetails[];
    village: villageDetails[];
    status: statusDetails[];
    scheme: schemeDetails[];
    samittee: samitteeDetails[];
    district: districtDetails[];
    compartment: compartmentDetails[];
    budgethead: budgetHeadDetails[];
    range: rangeDetails[]

}