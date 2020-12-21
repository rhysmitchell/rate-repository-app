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

const Tab = ({ text, onPress }) => (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <Text style={styles.text}>
            {text}
        </Text>
    </TouchableWithoutFeedback>
);

export default Tab;