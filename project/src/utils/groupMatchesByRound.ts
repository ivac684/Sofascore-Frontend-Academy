// utils.ts
import { Match } from '@/types/Match';

export function groupMatchesByRound(matches: Match[]) {
    return matches.reduce((acc, match) => {
        const round = `Round ${match.round}`;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(match);
        return acc;
    }, {} as Record<string, Match[]>);
}
