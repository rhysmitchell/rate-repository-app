import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colorScheme.dark,
    },
});

const AppBar = () => (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/' component={AppBarTab}>Repositories</Link>
            <Link to='/signin' component={AppBarTab}>Sign In</Link>
        </ScrollView>
    </View>
);

export default AppBar;