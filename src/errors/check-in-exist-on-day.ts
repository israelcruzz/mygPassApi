export class CheckInExistOnDay extends Error {
    constructor(){
        super('Check in has already been done')
    }
}