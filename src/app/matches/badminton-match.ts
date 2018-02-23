export class BadmintonMatch {
    id: number;
    type: string;
    player1: string;
    player2: string;
    player3: string;
    player4: string;

    constructor(type: string, player1: string, player2: string, player3: string, player4: string) {
        this.type = type;
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.player4 = player4;
    }
}
