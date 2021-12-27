export class TurnMetadata{
    public startMatches: number;
    public remainingMatches?: number;
    public isAi1Turn: boolean;

    constructor(startMatches:number, isAi1Turn: boolean){
        this.startMatches = startMatches;
        this.isAi1Turn= isAi1Turn;
    } 
} 