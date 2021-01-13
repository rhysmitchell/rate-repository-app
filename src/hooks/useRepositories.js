import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort) => {

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

    const { data } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables: sortObject
    });

    return data?.repositories;
};

export default useRepositories;