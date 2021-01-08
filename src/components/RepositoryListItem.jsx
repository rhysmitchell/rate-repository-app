import React from 'react';
import Text from './Text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from "expo-linking";
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    openUrlContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    textContainer: {
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
        flex: 4,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
});

export const RepositoryListItemFromUrl = () => {
    const { id } = useParams();
    const item = useRepository({ id });

    if (!item) {
        return null;
    }

    return <RepositoryListItem item={item} showUrl={true} />;
};

export const TouchableRepositoryListItem = ({ item }) => {
    const history = useHistory();

    return (
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
            <RepositoryListItem item={item} />
        </TouchableOpacity>
    );
};

export const RepositoryListItem = ({ item, showUrl }) => {
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
                        <Text style={{ backgroundColor: '#0366d6', color: 'white', marginTop: 2, padding: 3, borderRadius: 2 }} testID="testRepoLanguage">{item.language}</Text>
                    </View>
                    <View style={styles.indicatorContainer}>
                        <Text testID="testRepoStargazersCount">
                            <strong>
                                {item.stargazersCount}
                            </strong>
                            {'\n'}
                        Stars
                    </Text>

                        <Text testID="testRepoForkCount">
                            <strong>
                                {item.forksCount}
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
                </View>
            </View>
            {
                showUrl && <View style={styles.openUrlContainer}>
                    <TouchableOpacity style={{
                        backgroundColor: theme.colors.primary,
                        padding: 10,
                        margin: 15,
                        height: 40,
                    }}
                        onPress={() => Linking.openURL(item.url)}
                        testID='testSubmitButton'
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Open GitHub URL</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

export default RepositoryListItem;