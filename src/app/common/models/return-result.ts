export class ReturnResult<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
    constructor() { };
}