import { Injectable } from '@angular/core';
import { projectSubmissionValidation } from '../../models/project-submission-validation.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectSubmissionValidationService {

  public amountDetails: projectSubmissionValidation[] = []

  constructor() { }

  updateProjectAmount(value: projectSubmissionValidation) {
    this.amountDetails.push(value);
  }

  checkAmountValidation(): boolean {
    let valid: boolean = true;
    this.amountDetails.forEach(element => {
      if (element.spendAmount === 0) {
        valid = false;
        return;
      }
      if (element.remainingYearBudgetAmount < 0) {
        valid = false;
        return;
      }
    })
    return valid;
  }
}
