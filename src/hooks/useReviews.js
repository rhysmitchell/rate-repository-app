import { useQuery } from "@apollo/react-hooks";
import { GET_REVIEWS } from "../graphql/queries";

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

                console.log(nextResult);

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