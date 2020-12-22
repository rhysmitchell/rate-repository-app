import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorScheme.dark,
    },
});

const AppBar = () => (
    <View style={styles.container}>
        <AppBarTab text="Repositories" onPress={() => console.log(`press!`)} />
    </View>
);

export default AppBar;