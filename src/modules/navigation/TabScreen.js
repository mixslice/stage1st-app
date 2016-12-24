import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import { fromJS } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../AppRouter';

const defaultRouteConfig = fromJS({
  navigationBar: {
    backgroundColor: '#000',
    tintColor: '#fff',
  },
});

const TabScreen = () => (
  <TabNavigation
    id="main"
    navigatorUID="main"
    initialTab="forums"
    tabBarHeight={45}
  >
    <TabItem
      id="threads"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-heart" size={30} color="#000" />
        : <Icon name="ios-heart-outline" size={30} color="#000" />)
      }
    >
      <StackNavigation
        id="threads"
        navigatorUID="threads"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('favedThreads')}
      />
    </TabItem>

    <TabItem
      id="forums"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-folder" size={30} color="#000" />
        : <Icon name="ios-folder-outline" size={30} color="#000" />)
      }
    >
      <StackNavigation
        id="forums"
        navigatorUID="forums"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('forums')}
      />
    </TabItem>

    <TabItem
      id="personal"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-person" size={35} color="#000" />
        : <Icon name="ios-person-outline" size={35} color="#000" />)
      }
    >
      <StackNavigation
        id="personal"
        navigatorUID="personal"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('color')}
      />
    </TabItem>
  </TabNavigation>
);

export default TabScreen;
