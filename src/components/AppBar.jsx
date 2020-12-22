import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: theme.colorScheme.dark,
    },
});

const AppBar = () => (
    <View style={styles.container}>
        <Link to='/' component={AppBarTab}>
            Repositories
        </Link>
        <Link to='/signin' component={AppBarTab}>
            Sign In
        </Link>
    </View>
);

export default AppBar;