import React from 'react';
import Text from './Text';
import { StyleSheet, View, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textContainer: {
        marginLeft: 10,
    },
    avatarContainer: {
        //
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

const RepositoryListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
            </View>

            <View style={styles.textContainer}>
                <Text fontWeight="bold">{item.fullName}</Text>
                <Text>{item.description}</Text>
                <View style={styles.badgeContainer}>
                    <Text style={{ backgroundColor: '#0366d6', color: 'white', marginTop: 2, padding: 3, borderRadius: 2 }}>{item.language}</Text>
                </View>
                <View style={styles.indicatorContainer}>
                    <Text>
                        <strong>
                            {item.stargazersCount}
                        </strong>
                        {'\n'}
                        Stars
                    </Text>

                    <Text>
                        <strong>
                            {item.forksCount}
                        </strong>
                        {'\n'}
                        Forks
                    </Text>

                    <Text>
                        <strong>
                            {item.reviewCount}
                        </strong>
                        {'\n'}
                        Reviews
                    </Text>

                    <Text>
                        <strong>
                            {item.ratingAverage}
                        </strong>
                        {'\n'}
                        Rating
                    </Text>
                </View>
            </View>
        </View >
    );
};

export default RepositoryListItem;