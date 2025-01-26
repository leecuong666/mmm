import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/index';
import {Provider} from 'react-redux';
import {persist, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nextProvider} from 'react-i18next';
import i18next from './src/language';

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <GestureHandlerRootView>
            <RootNavigation />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
