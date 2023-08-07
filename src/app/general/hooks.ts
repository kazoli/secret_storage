import { useEffect } from 'react';
import { useAppContext } from '../../components/core/Context';

// Hook to not loose data if leave page without exporting
export function useBeforeUnloadConfirm() {
  const { storageState } = useAppContext();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (storageState.exportAvailable) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [storageState.exportAvailable]);
}
