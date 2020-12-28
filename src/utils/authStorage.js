import AsyncStorage from '@react-native-community/async-storage';

export default class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const token = await AsyncStorage.getItem(
            `${this.namespace}:token`,
        );

        return token ? JSON.parse(token) : [];
    }

    async setAccessToken(token) {
        await AsyncStorage.setItem(`${this.namespace}:token`, token);
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}