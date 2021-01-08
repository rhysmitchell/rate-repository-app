
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { TouchableRepositoryListItem } from './RepositoryListItem';
import useRepositories from '../hooks/useRepositories';


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = props => {
  const { repositories } = props;
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
  const renderItem = ({ item }) => <TouchableRepositoryListItem item={item} />;

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