import React from 'react';
import Text from './Text';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from "expo-linking";
import theme from '../theme';
import NumAbbr from 'number-abbreviate';

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
        paddingLeft: '2em',
        paddingRight: '2em',
    },
    urlButton: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        margin: 15,
        height: 40,
    },
    badge: {
        backgroundColor: '#0366d6',
        color: 'white',
        marginTop: 2,
        padding: 3,
        borderRadius: 2,
    },
});

export const RepositoryListItemFromUrl = () => {
    const { id } = useParams();
    const item = useRepository({ id });

    if (!item) {
        return null;
    }

    return <RepositoryListItem item={item}>
        <View style={styles.openUrlContainer}>
            <TouchableOpacity
                onPress={() => Linking.openURL(item.url)}
                style={styles.urlButton}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Open in GitHub</Text>
            </TouchableOpacity>
        </View>
    </RepositoryListItem>;
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
                <Text testID="testRepoStargazersCount">
                    <strong>
                        {NumAbbr(item.stargazersCount, 1)}
                    </strong>
                    {'\n'}
                        Stars
                    </Text>

                <Text testID="testRepoForkCount">
                    <strong>
                        {NumAbbr(item.forksCount, 1)}
                    </strong>
                    {'\n'}
                        Forks
                    </Text>

                <Text testID="testRepoReviewCount">
                    <strong>
                        {item.reviewCount}
                    </strong>
                    {'\n'}
                        Reviews
                    </Text>

                <Text testID="testRepoRatingAverage">
                    <strong>
                        {item.ratingAverage}
                    </strong>
                    {'\n'}
                        Rating
                    </Text>
            </View>

            {children}
        </>
    );
};

export default RepositoryListItem;