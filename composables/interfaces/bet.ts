export default interface Bet {
    id: string;
    userId: string;
    startTime: number;
    endTime: number | null;
    betAmountEth: number;
}