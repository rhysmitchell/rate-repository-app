import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
    },
    input: {
        margin: 10,
        padding: 15,
        borderRadius: 5,
        height: 50,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
    },
});

const FormikTextInput = props => {
    const { name } = props;
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;