import { GameStatus } from '../enums';
import { Game, Player, SetScore, NewPlayer, NumberOfSets } from '../types';
import { hasAtLeastTwoDifference } from './numbers';

type PlayersPlaying = {
  winningPlayer: Player;
  otherPlayer: Player;
};

type PlayerNewScore = {
  newWinningScore: number;
  newOtherScore: number;
  winGame: boolean;
};

type PlayerNewSet = {
  newSet: Player['sets'];
  winSet: boolean;
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
  return {
    id,
    currentSet: 0,
    numberOfSets,
    status: GameStatus.ONGOING,
    chrono: 0,
    players: [getNewPlayer(player1, numberOfSets), getNewPlayer(player2, numberOfSets)]
  };
}

/**
 * Return a new player object with default values
 */
export function getNewPlayer(player: NewPlayer, numberOfSets: NumberOfSets): Player {
  const setsToPlay = numberOfSets === 2 ? 3 : 5;
  const sets = Array.from({ length: setsToPlay }).map(() => {
    return {
      win: false,
      point: 0
    };
  });
  return {
    name: player.name,
    avatarId: player.avatarId,
    hasService: true,
    sets,
    currentPoint: 0
  };
}

/**
 * Return a random number with the current timestamp
 */
export function getRandomId(): number {
  return new Date().getTime();
}

/**
 * Return the winner and otherPlayer point score and if the points wins the game
 */
export function getPointScore({ winningPlayer, otherPlayer }: PlayersPlaying): PlayerNewScore {
  const winningPlayerScore = winningPlayer.currentPoint;
  const otherPlayerScore = otherPlayer.currentPoint;

  if (winningPlayerScore <= 2) {
    return {
      newWinningScore: winningPlayerScore + 1,
      newOtherScore: otherPlayerScore,
      winGame: false
    };
  }
  if (otherPlayerScore <= 2 && winningPlayerScore < 3) {
    return {
      newWinningScore: winningPlayerScore + 1,
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
      newWinningScore: winningPlayerScore + 1,
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

/**
 * Return the new winner sets and if he wins the set
 */
export function getGameScore({
  winningPlayer,
  otherPlayer,
  currentSet
}: PlayersPlaying & { currentSet: number }): PlayerNewSet {
  const playerSet = [...winningPlayer.sets];
  const loserSet = [...otherPlayer.sets];
  if (!playerSet) {
    throw new Error(`No set in index ${currentSet} found`);
  }

  const currentSetPoint = playerSet[currentSet].point + 1;
  const loserSetPoint = loserSet[currentSet].point;
  const winnerWinSet = winSet(currentSetPoint, loserSetPoint);
  const newSet = playerSet.map((s, i) => {
    if (i === currentSet) {
      return { point: currentSetPoint, win: winnerWinSet };
    }
    return s;
  });

  return {
    newSet: newSet,
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
  return winnerSet >= 6 && hasAtLeastTwoDifference(winnerSet, otherPlayerSet);
}

/**
 * Returns the otherPlayer index, the winningPlayer and the otherPlayer
 */
export function getPlayers(
  winningPlayerIndex: number,
  players: [Player, Player]
): PlayersPlaying & { otherPlayerIndex: number } {
  const winningPlayer = players[winningPlayerIndex];
  const otherPlayerIndex = winningPlayerIndex === 0 ? 1 : 0;
  const otherPlayer = players[otherPlayerIndex];
  return {
    winningPlayer,
    otherPlayer,
    otherPlayerIndex
  };
}
