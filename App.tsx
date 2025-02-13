import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/index';
import {I18nextProvider} from 'react-i18next';
import i18next from './src/language';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppComProvider from './src/components/Global/AppProvider';
import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

const App = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18next}>
        <GestureHandlerRootView>
          <AppComProvider>
            <RootNavigation />
          </AppComProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;
