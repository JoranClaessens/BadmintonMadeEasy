import { User } from '../account/user';

export class Tournament {
    id: number;
    title: string;
    numberOfTeams: number;
    type: string;
    user: User;

    constructor(title: string, numberOfTeams: number, type: string) {
        this.title = title;
        this.numberOfTeams = numberOfTeams;
        this.type = type;
    }
}
