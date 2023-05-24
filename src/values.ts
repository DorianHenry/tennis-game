import { GameStatus } from './functions';
import { Game } from './types';

export const gameTest: Game[] = [
  {
    id: 1,
    currentSet: 0,
    isTieBreak: false,
    status: GameStatus.ONGOING,
    numberOfSets: 2,
    chrono: 0,
    players: [
      {
        name: 'Sabrina',
        winTheMatch: false,
        hasService: true,
        avatarId: 3,
        sets: [
          {
            win: false,
            point: 0
          },
          {
            point: 0,
            win: false
          },
          {
            point: 0,
            win: false
          }
        ],
        currentPoint: 0
      },
      {
        name: 'Marine',
        winTheMatch: false,
        hasService: false,
        avatarId: 4,
        sets: [
          {
            win: false,
            point: 0
          },
          {
            point: 0,
            win: false
          },
          {
            point: 0,
            win: false
          }
        ],
        currentPoint: 0
      }
    ]
  },
  {
    id: 2,
    currentSet: 2,
    numberOfSets: 3,
    status: GameStatus.ONGOING,
    isTieBreak: false,
    chrono: 300,
    players: [
      {
        name: 'Victoria',
        winTheMatch: false,
        hasService: true,
        avatarId: 1,
        sets: [
          {
            win: true,
            point: 6
          },
          {
            point: 0,
            win: false
          },
          {
            point: 5,
            win: false
          },
          {
            point: 0,
            win: false
          },
          {
            point: 0,
            win: false
          }
        ],
        currentPoint: 3
      },
      {
        name: 'Julia',
        hasService: false,
        winTheMatch: false,
        avatarId: 2,
        sets: [
          {
            win: false,
            point: 4
          },
          {
            win: true,
            point: 6
          },
          {
            win: false,
            point: 5
          },
          {
            win: false,
            point: 0
          },
          {
            win: false,
            point: 0
          }
        ],
        currentPoint: 3
      }
    ]
  }
];
