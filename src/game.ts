import { Ai } from "./ai.js";
import { GameMetadata } from "./game-metadata.js";
import { TurnMetadata } from "./turn-metadata.js";

export class Game{
    public matches: number;
    public ai1: Ai;
    public ai2: Ai;
    public isAi1Turn: boolean;

    constructor(matches: number, ai1: Ai, ai2: Ai, isAi1Turn: boolean){
        this.matches = matches;
        this.ai1 = ai1;
        this.ai2 = ai2;
        this.isAi1Turn = isAi1Turn;
    } 

    public simulate(): GameMetadata{
        const turns: Array<TurnMetadata> = []; 
        const originalMatches: number = this.matches;
        const didAi1Start: boolean = this.isAi1Turn;

        while(this.matches > 0)
        {
            turns.push(this.simulateTurn());
        } 

        return new GameMetadata(originalMatches, this.ai1, this.ai2, didAi1Start, turns[turns.length - 1].isAi1Turn, turns);
    } 

    private simulateTurn(): TurnMetadata{
        const turn: TurnMetadata = new TurnMetadata(this.matches, this.isAi1Turn);

        this.matches -= this.isAi1Turn ? this.ai1.takeMatches(this.matches) : this.ai2.takeMatches(this.matches); 
        this.isAi1Turn = !this.isAi1Turn;
        
        turn.remainingMatches = this.matches;
        return turn;
    } 
} 