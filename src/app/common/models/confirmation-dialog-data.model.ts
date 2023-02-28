import { ActionTypes } from "./enums/action-button-types.enum.model";

export interface confirmationDialogModel {
    actionTitle?: string;
    title?: string;
    message?: string;
    action: ActionTypes;
}