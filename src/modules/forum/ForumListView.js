import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  View,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { List } from 'immutable';

// import ImmutableDataSource from '../../components/ImmutableDataSource';
import Router from '../AppRouter';
import Row from './ForumRow';

@withNavigation
class ForumListView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
    },
  }

  componentWillMount() {
    this.props.loadForumPage();
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      name={rowData.get('name')}
      // subscribed={rowData.get('subscribed')}
      onPress={() => {
        this.props.navigator.push(Router.getRoute('threads', { title: rowData.get('name') }));
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    return (
      <ImmutableListView
        immutableData={this.props.forums}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        enableEmptySections
      />
    );
  }
}

ForumListView.propTypes = {
  forums: PropTypes.instanceOf(List).isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loadForumPage: PropTypes.func.isRequired,
};

ForumListView.defaultProps = {
  forums: List(),
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default ForumListView;
