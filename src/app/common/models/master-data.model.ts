import { divisionDetails } from "src/app/models/division-details.model"
import { financialYearDetails } from "src/app/models/financialyear-details.model";
import { roleDetails } from "src/app/models/role-details.model"

export interface masterData {
    division: divisionDetails[];
    role: roleDetails[];
    financialyear: financialYearDetails[];
}