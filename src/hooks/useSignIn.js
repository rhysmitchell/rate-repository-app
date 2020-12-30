import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {

        const { data } = await mutate({
            variables: {
                credentials: {
                    username,
                    password,
                }
            }
        });

        if (data) {
            const token = await data.authorize.accessToken;
            await authStorage.setAccessToken(token);
            await apolloClient.resetStore();
        }

        return data;
    };

    return [signIn, result];
};

export default useSignIn;
