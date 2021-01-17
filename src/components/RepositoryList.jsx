
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { TouchableRepositoryListItem } from './RepositoryListItem';
import ItemSeparator from './ItemSeparator';
import { Searchbar } from 'react-native-paper';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';

export const RepositoryListContainer = props => {
  const { repositories, sortOrder, setSortOrder, filter, setFilter, onEndReach } = props;
  const renderItem = ({ item }) => <TouchableRepositoryListItem item={item} />;


  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
          <Searchbar
            placeholder="Search"
            onChangeText={(value) => setFilter(value)}
            value={filter}
          />

          <ItemSeparator />

          <RNPickerSelect
            onValueChange={(value) => { setSortOrder(value); }}
            value={sortOrder}
            items={[
              {
                label: "Latest repositories",
                value: "CREATED_AT_DESC",
              },
              {
                label: "Highest rated repositories",
                value: "RATING_AVERAGE_DESC",
              },
              {
                label: "Lowest rated repositores",
                value: "RATING_AVERAGE_ASC",
              },
            ]}
          />

          <ItemSeparator />
        </>
      }
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState("CREATED_AT_DESC");
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);
  const { repositories, fetchMore } = useRepositories(8, sortOrder, debouncedFilter);

  const onEndReach = () => {
    fetchMore();
  };


  return <RepositoryListContainer
    repositories={repositories}
    sortOrder={sortOrder}
    setSortOrder={setSortOrder}
    filter={filter}
    setFilter={setFilter}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;