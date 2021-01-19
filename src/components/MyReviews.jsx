import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useUserReviews } from '../hooks/useReviews';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const MyReviews = () => {
    const { reviews, fetchMore, refetch } = useUserReviews({
        first: 4,
        includeReviews: true,
    });

    const onEndReach = () => {
        fetchMore();
    };

    return <View>
        <FlatList
            ItemSeparatorComponent={ItemSeparator}
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.2}
        />
    </View>;
};


const ReviewItem = ({ review, refetch }) => {
    const history = useHistory();
    const formattedCreatedAt = new Date(`${review.createdAt}`).toLocaleDateString();

    const [deleteReview] = useMutation(DELETE_REVIEW);

    const handleDelete = async ({ id }) => {
        const { data } = await deleteReview({
            variables: { id }
        });

        if (data.deleteReview) {
            refetch();
        }
    };

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
        </View>

        <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => history.push(`/${review.repository.id}`)}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>View repository</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.danger }]}
                onPress={() =>
                    Alert.alert(
                        `Delete review`,
                        `Are you sure you want to delete this review?`,
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            { text: 'Delete', onPress: () => handleDelete(review) },
                        ],
                        { cancelable: true }
                    )}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Delete review</Text>
            </TouchableOpacity>
        </View>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    ratingContainer: {
        borderWidth: 2,
        borderColor: '#1461ac',
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
    },
    ratingText: {
        color: '#1461ac',
        textAlign: 'center',
    },
    ratingContentContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    ratingContentDate: {
        color: '#5b5f62',
        fontWeight: "600",
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        padding: 10,
        margin: 10,
        width: '48%',
        borderRadius: 5,
    }
});

export default MyReviews;
