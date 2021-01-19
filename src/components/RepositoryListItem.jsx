import React from 'react';
import Text from './Text';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import { useHistory, useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from "expo-linking";
import theme from '../theme';
import NumAbbr from 'number-abbreviate';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    openUrlContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 10
    },
    badgeContainer: {
        flexDirection: "row",
        margin: 2,
        flexGrow: 0,
    },
    badgeContent: {
        flexDirection: "row",
        backgroundColor: '#0366d6',
        color: 'white',
        marginTop: 10,
        padding: 3,
        borderRadius: 2
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    indicatorText: {
        fontWeight: 'bold',
    },
    urlButton: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        margin: 15,
        height: 40,
    },
    urlButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: '#0366d6',
        color: 'white',
        marginTop: 2,
        padding: 3,
        borderRadius: 2,
    },
    ratingContainer: {
        borderWidth: 2,
        borderColor: '#1461ac',
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
        color: '#1461ac',
    },
    ratingText: {
        textAlign: 'center',
    },
    ratingContentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    ratingContentDate: {
        color: '#5b5f62',
        fontWeight: "600",
    },
});

const ReviewItem = ({ review }) => {
    const formattedCreatedAt = new Date(`${review.createdAt}`).toLocaleDateString();

    return (<>
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                    {review.rating}
                </Text>
            </View>

            <View style={styles.ratingContentContainer}>
                <Text fontWeight="bold">{review.user.username}</Text>
                <Text style={styles.ratingContentDate}>{formattedCreatedAt}</Text>
                <Text>{review.text}</Text>
            </View>
        </View></>
    );
};

export const RepositoryListItemFromUrl = () => {
    const { id } = useParams();
    const item = useRepository({ id });
    const { reviews, fetchMore } = useReviews({ id, first: 8 });

    if (!item) {
        return null;
    }
    const onEndReach = () => {
        fetchMore();
    };


    return <FlatList
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() =>
            <RepositoryListItem item={item}>
                <View style={styles.openUrlContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(item.url)}
                        style={styles.urlButton}
                    >
                        <Text style={styles.urlButtonText}>Open in GitHub</Text>
                    </TouchableOpacity>
                </View>
                <ItemSeparator />
            </RepositoryListItem>} />;
};

export const TouchableRepositoryListItem = ({ item }) => {
    const history = useHistory();

    return (
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
            <RepositoryListItem item={item} />
        </TouchableOpacity>
    );
};

export const RepositoryListItem = ({ item, children }) => {
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                </View>

                <View style={styles.textContainer}>
                    <Text fontWeight="bold" testID="testFullName">{item.fullName}</Text>
                    <Text testID="testRepoDescription">{item.description}</Text>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badge} testID="testRepoLanguage">{item.language}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.indicatorContainer}>
                <Text style={styles.indicatorText} testID="testRepoStargazersCount">
                    {NumAbbr(item.stargazersCount, 1)}
                    {'\n'}
                        Stars
                    </Text>

                <Text style={styles.indicatorText} testID="testRepoForkCount">
                    {NumAbbr(item.forksCount, 1)}
                    {'\n'}
                        Forks
                    </Text>

                <Text style={styles.indicatorText} testID="testRepoReviewCount">
                    {item.reviewCount}
                    {'\n'}
                        Reviews
                    </Text>

                <Text style={styles.indicatorText} testID="testRepoRatingAverage">
                    {item.ratingAverage}
                    {'\n'}
                        Rating
                    </Text>
            </View>

            {children}
        </>
    );
};

export default RepositoryListItem;