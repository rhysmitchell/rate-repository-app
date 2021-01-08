import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id }) => {
    const { data } = useQuery(GET_REPOSITORY, { variables: { id } });
    return data?.repository;
};

export default useRepository;