import React from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import { SIGN_UP } from '../graphql/mutations';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

const SignUp = () => {
    const [createUser] = useMutation(SIGN_UP);
    const [signIn] = useSignIn();

    const submitForm = async ({ username, password }) => {
        try {
            const { data } = await createUser({
                variables: { user: { username, password } },
            });

            if (data) {
                try {
                    await signIn({ username, password });
                    history.push('/');
                } catch (e) {
                    console.log('Sign up failed.', e);
                }
            }
        } catch (e) {
            console.log('There was an error creating a new user.', e);
        }
    };

    return <SignUpContainer onSubmit={submitForm} />;
};

export const SignUpContainer = props => {
    const { onSubmit } = props;

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: '',
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(1, 'Username must be at least 1 character.')
            .max(30, 'Username must not be more than 30 characters.')
            .required('Username is required'),
        password: yup
            .string()
            .min(5, 'Password must be at least 5 characters.')
            .max(50, 'Password must not be more than 50 characters.')
            .required('Password is required.'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required.')
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ submitForm }) => <SignUpForm onSubmit={submitForm} />}
        </Formik>
    );
};

const SignUpForm = props => {
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

        <FormikTextInput
            name='passwordConfirmation'
            testID='testPasswordConfirmation'
            placeholder='Password confirmation'
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
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
    </View>;
};

export default SignUp;