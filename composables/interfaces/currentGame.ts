import Bet from './bet';

export default interface CurrentGame {
    id: string;
    prizeFund: number;
    gameDate: string;
    bets: Bet[] | undefined[];
    winnerId?: string;
    winnerBetId?: string;
    winAmountEth?: number;
}
