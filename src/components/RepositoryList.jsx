
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryListItem from './RepositoryListItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error ({error})</Text>;
  }

  const { repositories } = data;

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryListItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

export default RepositoryList;