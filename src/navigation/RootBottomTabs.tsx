import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TabShape from '../components/Navigation/TabShape';
import TabsCustom from '../components/Navigation/TabsCustom';
import Notification from '../screens/Notification';
import {RootBottomTabsParams} from './types';
import Backdrop from '../components/Core/Backdrop';
import {useRef, useState, Fragment} from 'react';
import {MainTabRef} from '../components/Navigation/MainTab';
import {debounce} from 'lodash';

const Tab = createBottomTabNavigator<RootBottomTabsParams>();

const RootBottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, animation: 'shift'}}
      tabBar={props => <CustomTabs {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifcation" component={Notification} />
    </Tab.Navigator>
  );
};

const CustomTabs = (props: BottomTabBarProps) => {
  const tabRef = useRef<MainTabRef | null>(null);
  const [isShowBackdrop, setIsShowBackdrop] = useState(false);

  const openTab = () => {
    setIsShowBackdrop(true);
  };

  const closeTab = () => {
    setIsShowBackdrop(false);
  };

  const handleMainTabPress = debounce(
    (tabState: number) => {
      if (tabState == 1) {
        closeTab();
      } else {
        openTab();
      }
    },
    666,
    {leading: true, trailing: false},
  );

  const handleBackdropPress = () => {
    closeTab();
    tabRef?.current?.closeMainTab();
  };

  const handleTabChange = () => {
    if (!isShowBackdrop) return;

    handleBackdropPress();
  };

  return (
    <Fragment>
      <Backdrop display={isShowBackdrop} onPress={handleBackdropPress} />
      <TabShape />
      <TabsCustom
        ref={tabRef}
        {...props}
        onMainTabPress={handleMainTabPress}
        onTabChange={handleTabChange}
      />
    </Fragment>
  );
};

export default RootBottomTabs;
