import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const { data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables,
    });
    return data?.repository;
};

export default useRepository;