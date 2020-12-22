import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
});

const AppBarTab = props => {
    const { children } = props;
    return (
        <TouchableWithoutFeedback style={styles.container} {...props}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;