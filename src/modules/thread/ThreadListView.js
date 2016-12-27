import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { List } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableListView from '../../components/ImmutableListView';
import Row from './ThreadRow';
import Router from '../AppRouter';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || 'Threads',
      renderRight: () => (
        <TouchableOpacity style={styles.iconContainer}>
          <Icon style={styles.icon} name="ios-create-outline" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    },
  }

  componentWillMount() {
    this.props.loadThreadPage();
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      forumName={rowData.get('forumName')}
      author={rowData.get('author')}
      timestamp={rowData.get('lastpost')}
      onPress={() => {
        this.props.navigator.push(Router.getRoute('posts', {
          tid: rowData.get('tid'),
          title: rowData.get('subject'),
        }));
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    const { threads, loading } = this.props;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }
    return (
      <ImmutableListView
        immutableData={threads}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={30}
      />
    );
  }
}

ThreadListView.propTypes = {
  fid: PropTypes.number,
  threads: PropTypes.instanceOf(List).isRequired,
  loading: PropTypes.bool,
  loadThreadPage: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ThreadListView.defaultProps = {
  threads: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
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

export default ThreadListView;
