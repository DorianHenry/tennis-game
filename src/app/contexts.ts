import { createContext } from 'react';
import { GameId } from '../types';

export const GameIdContext = createContext<GameId>(0);
export const PlayerIndexContext = createContext(0);
