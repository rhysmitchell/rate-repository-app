import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/queries';
import { useApolloClient } from "@apollo/react-hooks";
import AuthStorageContext from '../contexts/AuthStorageContext';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colorScheme.dark,
    },
});

const AppBar = () => {
    const { data } = useQuery(AUTHORIZE_USER, {
        fetchPolicy: "cache-and-network",
    });

    const authorizedUser = data ? data.authorizedUser : null;

    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to='/' component={AppBarTab}>Repositories</Link>
                {authorizedUser && (
                    <>
                        <Link to='/create-review' component={AppBarTab}>Create a review</Link>
                        <Link to='/my-reviews' component={AppBarTab}>My reviews</Link>
                        <Link to='/' onPress={signOut} component={AppBarTab}>Sign Out</Link>
                    </>
                )}
                {!authorizedUser && <>
                    <Link to='/signin' component={AppBarTab}>Sign In</Link>
                    <Link to='/signup' component={AppBarTab}>Sign Up</Link>
                </>}
            </ScrollView>
        </View>
    );
};

export default AppBar;