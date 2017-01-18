import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { List, Map } from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './PostRow';
import PostToolbar from './PostToolbar';

const renderRow = rowData => (
  <Row
    message={rowData.get('message')}
    position={rowData.get('position')}
    author={rowData.get('author')}
    authorId={rowData.get('authorid')}
    timestamp={rowData.get('dateline')}
  />
);

class PostListView extends Component {
  static route = {
    navigationBar: {
      title: 'Posts',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadPostPage();
      this.props.loadThreadInfo();
    });
  }

  componentWillReceiveProps({ tid: nextTid, uid: nextUid, pageNo: nextPageNo }) {
    const { tid, uid, pageNo } = this.props;
    if (nextTid !== tid || nextUid !== uid || nextPageNo !== pageNo) {
      this.scrollView.scrollTo({ y: 0, animated: false });
      InteractionManager.runAfterInteractions(() => {
        this.props.loadPostPage();
      });
    }
  }

  renderHeader = () => {
    const isFav = this.props.thread.get('isFav');
    const subject = this.props.thread.get('subject');
    return (
      <View style={styles.header}>
        <View style={styles.headerTitleView}>
          <Text style={styles.headerText}>
            {__DEV__ ? `${this.props.tid}: ${subject}` : subject}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favButton}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          onPress={() => this.props.favThread()}
        >
          <Icon
            name={isFav ? 'star' : 'star-o'}
            size={25}
            color={palette.yellow}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  render() {
    const { posts, loading, refresh, pageNo, totalPage, jumpToPage } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={posts}
          renderRow={renderRow}
          renderScrollComponent={props =>
            <ScrollView ref={(c) => { this.scrollView = c; }} {...props} />
          }
          refreshControl={
            <RefreshControl
              refreshing={refresh && loading}
              onRefresh={() => this.props.loadPostPage(true)}
            />
          }
          renderHeader={this.renderHeader}
          renderFooter={loading ? this.renderFooter : null}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          rowsDuringInteraction={5}
        />
        <PostToolbar
          pageNo={pageNo}
          totalPage={totalPage}
          jumpToPage={jumpToPage}
        />
      </View>
    );
  }
}

PostListView.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  tid: PropTypes.number.isRequired,
  uid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  pageNo: PropTypes.number,
  totalPage: PropTypes.number,
  refresh: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPostPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  loadThreadInfo: PropTypes.func.isRequired,
  favThread: PropTypes.func.isRequired,
};

PostListView.defaultProps = {
  posts: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: palette.secondary,
  },
  headerTitleView: {
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    color: palette.inverted,
  },
  favButton: {
    marginLeft: 10,
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
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostListView;
