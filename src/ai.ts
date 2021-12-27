export enum Difficulties {
    VeryEasy = "Very Easy",
    Easy = "Easy",
    Average = "Average",
    Hard = "Hard",
    VeryHard = "Very Hard"
};

export class Ai {
    public difficulty: Difficulties;

    constructor(difficulty: Difficulties) {
        this.difficulty = difficulty;
    }

    public takeMatches(matchCount: number): number {
        switch (this.difficulty) {
            case Difficulties.VeryEasy:
                return this.performVeryEasyTurn(matchCount);
            case Difficulties.Easy:
                return this.performVeryEasyOrHardTurnByChance(matchCount, 75);
            case Difficulties.Average:
                return this.performVeryEasyOrHardTurnByChance(matchCount, 50);
            case Difficulties.Hard:
                return this.performVeryEasyOrHardTurnByChance(matchCount, 25);
            default:
                return this.performVeryHardTurn(matchCount);
        }
    }

    private performVeryEasyTurn(matchCount: number): number {
        return this.getRandomInt(1, 3);
    }

    private performVeryHardTurn(matchCount: number): number {
        const matches: number = matchCount % 4;

        return matches === 0 ? this.performVeryEasyTurn(matchCount) : matches;
    }

    private performVeryEasyOrHardTurnByChance(matchCount: number, chanceForVeryEasy: number): number {
        return this.getRandomInt(1, 100) <= chanceForVeryEasy ? this.performVeryEasyTurn(matchCount) : this.performVeryHardTurn(matchCount);
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor((Math.random() * max) + min);
    }
}