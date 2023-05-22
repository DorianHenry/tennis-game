import { useEffect } from 'react';
import store from '../../store/store';
import { LOCAL_STORAGE_NAME } from '../../constante';

export function useLocalStorage() {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(store.getState().games.gameList));
    });
    return () => {
      unsubscribe();
    };
  });
}
