import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Set } from 'immutable';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ThreadListViewContainer from './ThreadListViewContainer';
import withMessage from '../error/withMessage';
import { palette } from '../../styles/config';

@withMessage
export default class SubscribedTabView extends Component {
  static route = {
    navigationBar: {
      title: '订阅',
    },
  }

  render() {
    const forums = this.props.forums.toList();

    if (forums.size < 1) {
      return <ThreadListViewContainer fid="subscribed" />;
    }

    const slides = forums.map((forum) => {
      const key = String(forum.get('fid'));
      return (
        <ThreadListViewContainer
          key={key}
          fid={key}
          tabLabel={forum.get('name')}
        />
      );
    });

    return (
      <ScrollableTabView
        style={styles.container}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: palette.primary }}
        tabBarTextStyle={{ fontSize: 15 }}
        tabBarActiveTextColor={palette.primary}
        tabBarInactiveTextColor={palette.default}
        tabBarBackgroundColor={palette.toolbar}
      >
        <ThreadListViewContainer
          fid="subscribed"
          tabLabel="全部订阅"
        />
        {slides}
      </ScrollableTabView>
    );
  }
}

SubscribedTabView.propTypes = {
  forums: PropTypes.instanceOf(Set),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
  },
});
