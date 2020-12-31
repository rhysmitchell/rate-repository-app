import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                pageInfo: {
                    totalCount: 8,
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            const { queryAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

            const firstFullName = queryAllByTestId('testFullName')[0];
            const firstRepoDescription = queryAllByTestId('testRepoDescription')[0];
            const firstRepoLanguage = queryAllByTestId('testRepoLanguage')[0];
            const firstRepoForkCount = queryAllByTestId('testRepoForkCount')[0];
            const firstRepoStargazersCount = queryAllByTestId('testRepoStargazersCount')[0];
            const firstRepoRatingAverage = queryAllByTestId('testRepoRatingAverage')[0];
            const firstRepoReviewCount = queryAllByTestId('testRepoReviewCount')[0];

            expect(firstFullName).toHaveTextContent('jaredpalmer/formik');
            expect(firstRepoDescription).toHaveTextContent('Build forms in React, without the tears');
            expect(firstRepoLanguage).toHaveTextContent('TypeScript');
            expect(firstRepoForkCount).toHaveTextContent(1619);
            expect(firstRepoStargazersCount).toHaveTextContent(21856);
            expect(firstRepoRatingAverage).toHaveTextContent(88);
            expect(firstRepoReviewCount).toHaveTextContent(3);
        });
    });
});