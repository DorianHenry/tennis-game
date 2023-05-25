import { Game, Player, SetScore, NewPlayer, NumberOfSets } from '../types';
import { hasAtLeastTwoDifference } from './numbers';
import { GameStatus } from './string';

type PlayersPlaying = {
  winningPlayer: Player;
  otherPlayer: Player;
  isTieBreak: boolean;
};

type PlayerNewScore = {
  newWinningScore: number;
  newOtherScore: number;
  winGame: boolean;
};

type PlayerNewSet = {
  newSet: Player['sets'];
  winSet: boolean;
  winnerSetPoint: number;
  loserSetPoint: number;
};

/**
 * Return a new Game with initial values, the two players name and a unique id
 */
export function getNewGame(
  player1: NewPlayer,
  player2: NewPlayer,
  numberOfSets: NumberOfSets,
  id: number
): Game {
  const players: [Player, Player] = [
    getNewPlayer(player1, numberOfSets, 0),
    getNewPlayer(player2, numberOfSets, 1)
  ];

  return {
    id,
    currentSet: 0,
    numberOfSets,
    isTieBreak: false,
    status: GameStatus.ONGOING,
    chrono: 0,
    players
  };
}

/**
 * Return a new player object with default values
 */
export function getNewPlayer(player: NewPlayer, numberOfSets: NumberOfSets, index: number): Player {
  const setsToPlay = numberOfSets === 2 ? 3 : 5;
  const sets: SetScore[] = Array.from({ length: setsToPlay }, () => ({
    win: false,
    point: 0
  }));
  const hasService = index === 0;

  return {
    winTheMatch: false,
    name: player.name,
    avatarId: player.avatarId,
    hasService,
    sets,
    currentPoint: 0
  };
}

/**
 * Return the winner and otherPlayer point score and if the points wins the game
 */
export function getPointScore({
  winningPlayer,
  otherPlayer,
  isTieBreak
}: PlayersPlaying & { isTieBreak: boolean }): PlayerNewScore {
  const winningPlayerScore = winningPlayer.currentPoint;
  const otherPlayerScore = otherPlayer.currentPoint;

  if (isTieBreak) {
    return getTieBreakScore({ winningPlayerScore, otherPlayerScore });
  }

  const newWinningScore = winningPlayerScore + 1;

  if (winningPlayerScore <= 2 || (otherPlayerScore <= 2 && winningPlayerScore < 3)) {
    return {
      newWinningScore,
      newOtherScore: otherPlayerScore,
      winGame: false
    };
  }

  const isWinning =
    (winningPlayerScore === 3 && otherPlayerScore <= 2) ||
    (winningPlayerScore === 4 && otherPlayerScore === 3);

  if (isWinning) {
    return {
      newWinningScore: 0,
      newOtherScore: 0,
      winGame: true
    };
  }

  if (winningPlayerScore === 3 && otherPlayerScore === 3) {
    return {
      newWinningScore,
      newOtherScore: otherPlayerScore,
      winGame: false
    };
  }

  return {
    newWinningScore: winningPlayerScore,
    newOtherScore: otherPlayerScore - 1,
    winGame: false
  };
}

export function getTieBreakScore({
  winningPlayerScore,
  otherPlayerScore
}: {
  winningPlayerScore: number;
  otherPlayerScore: number;
}): PlayerNewScore {
  const newWinningScore = winningPlayerScore + 1;
  const winGame = isTieBreakWin(newWinningScore, otherPlayerScore);

  if (winGame) {
    return {
      newWinningScore: 0,
      newOtherScore: 0,
      winGame
    };
  }

  return {
    newWinningScore,
    newOtherScore: otherPlayerScore,
    winGame
  };
}

function isTieBreakWin(winningScore: number, otherScore: number) {
  return winningScore >= 7 && hasAtLeastTwoDifference(winningScore, otherScore);
}

export function isTieBreak(playerSet1: number, playerSet2: number) {
  return playerSet1 === 6 && playerSet2 === 6;
}

/**
 * Return the new winner sets and if he wins the set
 */
export function getGameScore({
  winningPlayer,
  otherPlayer,
  currentSet
}: Omit<PlayersPlaying, 'isTieBreak'> & { currentSet: number }): PlayerNewSet {
  const playerSet = [...winningPlayer.sets];
  const loserSet = [...otherPlayer.sets];

  if (!playerSet) {
    throw new Error(`No set in index ${currentSet} found`);
  }

  const winnerSetPoint = playerSet[currentSet].point + 1;
  const loserSetPoint = loserSet[currentSet].point;
  const winnerWinSet = winSet(winnerSetPoint, loserSetPoint);
  const newSet = playerSet.map((s, i) => {
    if (i === currentSet) {
      return { point: winnerSetPoint, win: winnerWinSet };
    }
    return s;
  });

  return {
    winnerSetPoint,
    loserSetPoint,
    newSet,
    winSet: winnerWinSet
  };
}

/**
 * Return true id the match is win
 */
export function isWinningMatch(sets: SetScore[], numberOfSets: NumberOfSets) {
  const numberOfVictory = sets.reduce((acc, cur) => {
    return cur.win ? acc + 1 : acc;
  }, 0);

  return numberOfVictory >= numberOfSets;
}

/**
 * Return a boolean if the winner wins the set or not
 */
function winSet(winnerSet: number, otherPlayerSet: number) {
  if (winnerSet === 7) {
    return true;
  }

  return winnerSet >= 6 && hasAtLeastTwoDifference(winnerSet, otherPlayerSet);
}

/**
 * Returns the otherPlayer index, the winningPlayer and the otherPlayer
 */
export function getPlayers(
  winningPlayerIndex: number,
  players: [Player, Player]
): Omit<PlayersPlaying, 'isTieBreak'> & { otherPlayerIndex: number } {
  const winningPlayer = players[winningPlayerIndex];
  const otherPlayerIndex = winningPlayerIndex === 0 ? 1 : 0;
  const otherPlayer = players[otherPlayerIndex];

  return {
    winningPlayer,
    otherPlayer,
    otherPlayerIndex
  };
}

export function isPlayerTheWinner(winner: Player | undefined, player: Player) {
  return winner !== undefined && winner.sets === player.sets;
}
