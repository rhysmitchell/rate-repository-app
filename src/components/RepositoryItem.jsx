import React from 'react';
import Text from './Text';

const RepositoryItem = ({ item }) => {
    return (
        <>
            <Text>Full name: {item.fullName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Average rating: {item.ratingAverage}</Text>
            <Text>Reviews: {item.reviewCount}</Text>
            <Text>Owner url: {item.ownerAvatarUrl}</Text>
        </>
    );
};

export default RepositoryItem;