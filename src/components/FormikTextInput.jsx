import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    errorText: {
        marginLeft: 10,
        color: 'red',
    },
});

const FormikTextInput = props => {
    const { name } = props;
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                style={showError ?
                    { ...StyleSheet.flatten([styles.input]), borderColor: 'red' } :
                    { ...StyleSheet.flatten([styles.input]), borderColor: 'black' }}
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