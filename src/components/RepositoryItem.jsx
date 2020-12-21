import React from 'react';

const RepositoryItem = ({item}) => {
    // repository's full name, description, language, number of forks, number of stars, rating average and number of reviews
    return (
        <li key={item.id}>
            Full name: {item.fullName}, <br/>
            Description: {item.description}, <br/>
            Language: {item.language}, <br/>
            Forks: {item.forksCount}, <br/>
            Stars: {item.stargazersCount}, <br/>
            Average rating: {item.ratingAverage}, <br/>
            Reviews: {item.reviewCount}, <br/>
            Owner url: {item.ownerAvatarUrl}.
        </li>
    );
};

export default RepositoryItem;