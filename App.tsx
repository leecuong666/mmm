import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/index';
import {Provider} from 'react-redux';
import {persist, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <GestureHandlerRootView>
          <RootNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
