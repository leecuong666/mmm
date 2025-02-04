import {useContext} from 'react';
import {AppContext} from '../components/Global/AppProvider';

const useAppGlobal = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppGlobal;
