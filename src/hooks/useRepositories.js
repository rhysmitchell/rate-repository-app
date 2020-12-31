import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const { data } = useQuery(GET_REPOSITORIES);
    return data?.repositories;
};

export default useRepositories;