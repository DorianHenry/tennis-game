import { useContext, useCallback } from 'react';
import { ConfirmContext, ConfirmParams } from '../components/context';

// This hook will allow us to access the confirm function
export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);
  return {
    confirm: useCallback(
      (p?: ConfirmParams) => {
        return confirmRef.current(p);
      },
      [confirmRef]
    )
  };
}
