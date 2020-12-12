export class dateService {
    constructor() { }
    
    getCurrDate(timestamp: number) {
        return new Date(timestamp * 1000);
    }
}