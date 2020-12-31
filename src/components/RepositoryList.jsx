
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryListItem from './RepositoryListItem';
import useRepositories from '../hooks//useRepositories';


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = props => {
  const { repositories } = props;
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
  const renderItem = ({ item }) => <RepositoryListItem item={item} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const repositories = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

export default RepositoryList;