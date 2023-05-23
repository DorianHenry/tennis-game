import { Game, SetScore } from '../types';
import { GameStatus } from '../enums';

export const gameTest: Game[] = [
  {
    id: 1,
    currentSet: 0,
    status: GameStatus.ONGOING,
    chrono: 0,
    numberOfSets: 2,
    players: [
      {
        name: 'John',
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
        name: 'Jason',
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
    status: GameStatus.ONGOING,
    chrono: 300,
    numberOfSets: 3,
    players: [
      {
        name: 'Adrien',
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
        name: 'Vincent',
        hasService: false,
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
        currentPoint: 0
      }
    ]
  }
];

export const expectedNewSet: SetScore[] = [
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
  },
  {
    point: 0,
    win: false
  },
  {
    point: 0,
    win: false
  }
];

export const expectedNewSetWomen = [
  {
    point: 0,
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
];
