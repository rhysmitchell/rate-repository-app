import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (first, sort, searchKeyword) => {

    const createdAtDescObject = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
    };

    let sortObject = null;
    switch (sort) {
        case "CREATED_AT_DESC":
            sortObject = createdAtDescObject;
            break;
        case "RATING_AVERAGE_ASC":
            sortObject = {
                orderBy: "RATING_AVERAGE",
                orderDirection: "ASC"
            };
            break;
        case "RATING_AVERAGE_DESC":
            sortObject = {
                orderBy: "RATING_AVERAGE",
                orderDirection: "DESC"
            };
            break;

        default:
            sortObject = createdAtDescObject;
    }

    sortObject = { ...sortObject, searchKeyword, first };

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables: sortObject
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...sortObject,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },
                };

                return nextResult;
            },
        });
    };

    return {
        repositories: data ? data.repositories.edges.map(({ node }) => node) : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useRepositories;