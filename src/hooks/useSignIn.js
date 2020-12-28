import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
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
            const auth = new AuthStorage();
            await auth.setAccessToken(data.authorize.accessToken);
            await auth.getAccessToken();
        }

        return data;
    };

    return [signIn, result];
};

export default useSignIn;
