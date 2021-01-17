import { useQuery } from "@apollo/react-hooks";
import { GET_REVIEWS, GET_USER_REVIEWS } from "../graphql/queries";

export const useUserReviews = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_USER_REVIEWS, {
        fetchPolicy: "cache-and-network",
        variables,
    });

    console.log(data);

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_USER_REVIEWS,
            variables: {
                fetchPolicy: 'cache-and-network',
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                ...variables,
            },

            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...previousResult.authorizedUser,
                        reviews: {
                            ...fetchMoreResult.authorizedUser.reviews,
                            edges: [
                                ...previousResult.authorizedUser.reviews.edges,
                                ...fetchMoreResult.authorizedUser.reviews.edges,
                            ],
                        },
                    },
                };

                return nextResult;
            },
        });
    };

    return {
        reviews: data ? data.authorizedUser.reviews.edges.map((edge) => edge.node) : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

const useReviews = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
        fetchPolicy: "cache-and-network",
        variables
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REVIEWS,
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                        },
                    },
                };

                return nextResult;
            },
        });
    };

    return {
        reviews: data
            ? data.repository.reviews.edges.map(({ node }) => node)
            : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useReviews;