import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useUserReviews } from '../hooks/useReviews';
import ItemSeparator from './ItemSeparator';
import { ReviewItem } from './RepositoryListItem';

const MyReviews = () => {
    const { reviews, fetchMore } = useUserReviews({
        first: 4,
        includeReviews: true,
    });

    const onEndReach = () => {
        fetchMore();
    };

    return <View style={styles.container}>
        <FlatList
            ItemSeparatorComponent={ItemSeparator}
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.2}
        />
    </View>;
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
    },
});

export default MyReviews;
