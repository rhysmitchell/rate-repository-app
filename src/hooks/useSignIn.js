import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
    constructor(namespace = 'authorization') {
        this.namespace = namespace;
    }

    async getToken() {
        const token = await AsyncStorage.getItem(
            `${this.namespace}:token`,
        );

        return token ? JSON.parse(token) : [];
    }

    async setToken(token) {
        await AsyncStorage.setItem(`${this.namespace}:token`, token);
    }

    async clearToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}

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
            await auth.setToken(data.authorize.accessToken);
            await auth.getToken();
        }

        return data;
    };

    return [signIn, result];
};

export default useSignIn;
