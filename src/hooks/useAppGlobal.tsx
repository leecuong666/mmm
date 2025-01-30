import {useContext} from 'react';
import {AppContext} from '../components/AppProvider';

const useAppGlobal = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppGlobal;
