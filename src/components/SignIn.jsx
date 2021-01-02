import React from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const SignIn = () => {
    const history = useHistory();

    const [signIn] = useSignIn();

    const submitForm = async ({ username, password }) => {
        try {
            await signIn({ username, password });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={submitForm} />;
};

export const SignInContainer = props => {
    const { onSubmit } = props;

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .min(8, 'Password should have a minimum of 8 characters.')
            .required('Password is required.'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ submitForm }) => <SignInForm onSubmit={submitForm} />}
        </Formik>
    );
};

const SignInForm = props => {
    const { onSubmit } = props;
    return <View>
        <FormikTextInput
            name='username'
            testID='testUsername'
            placeholder='Username'
            type='text'
        />

        <FormikTextInput
            name='password'
            testID='testPassword'
            placeholder='Password'
            type='password'
            secureTextEntry
        />

        <TouchableOpacity style={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            margin: 15,
            height: 40,
        }}
            onPress={onSubmit}
            testID='testSubmitButton'
        >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>
    </View>;
};

export default SignIn;