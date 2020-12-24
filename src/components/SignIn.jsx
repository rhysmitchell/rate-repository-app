import React from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should have a minimum of 8 characters.')
        .required('Password is required.'),
});

const SignIn = () => {
    const initialValues = {
        username: '',
        password: '',
    };

    const submitForm = (valules) => console.log(valules);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}>
            {({ submitForm }) => <SignInForm onSubmit={submitForm} />}
        </Formik>
    );
};

const SignInForm = props => {
    const { onSubmit } = props;

    return (
        <View>
            <FormikTextInput
                name='username'
                placeholder='Username'
                type='text'
            />

            <FormikTextInput
                name='password'
                placeholder='Password'
                type='password'
                secureTextEntry
            />

            <TouchableOpacity style={{
                backgroundColor: theme.colors.primary,
                padding: 10,
                margin: 15,
                height: 40,
            }} onPress={onSubmit}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};
export default SignIn;