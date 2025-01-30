import {useContext} from 'react';
import {AppContext} from '../components/AppProvider';

const useAppNotification = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppNotification;
