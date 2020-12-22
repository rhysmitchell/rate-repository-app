import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        <TouchableWithoutFeedback {...props}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;