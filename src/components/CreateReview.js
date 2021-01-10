import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const CreateReview = () => {
    const [mutate] = useMutation(CREATE_REVIEW);
    const history = useHistory();

    const submitForm = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;

        try {
            const { data } = await mutate({
                variables: {
                    review: { repositoryName, ownerName, rating: Number(rating), text },
                },
            });

            if (!data) {
                return null;
            }

            const id = await data.createReview.repository.id;
            history.push(`/${id}`);
        } catch (e) {
            console.log(e);
        }
    };

    return <CreateReviewContainer onSubmit={submitForm} />;
};

const CreateReviewContainer = props => {
    const { onSubmit } = props;

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        review: '',
    };

    const validationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required('Owner username is required'),
        repositoryName: yup
            .string()
            .required('Repository name is required'),
        rating: yup
            .number()
            .moreThan(-1, 'Rating should be betweem 0 - 100.')
            .lessThan(101, 'Rating should be betweem 0 - 100.')
            .required('Rating is required.'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ submitForm }) => <CreateReviewForm onSubmit={submitForm} />}
        </Formik>
    );
};

const CreateReviewForm = props => {
    const { onSubmit } = props;

    return (
        <View>
            <FormikTextInput
                name='ownerName'
                testID='testOwnerName'
                placeholder='Repository owner name'
                type='text'
            />

            <FormikTextInput
                name='repositoryName'
                testID='testRepositoryName'
                placeholder='Repository name'
                type='text'
            />

            <FormikTextInput
                name='rating'
                testID='testRating'
                placeholder='Rating between 0 and 100'
                type='number'
            />

            <FormikTextInput
                name='text'
                testID='testText'
                placeholder='Review'
                type='text'
            />

            <TouchableOpacity style={{
                backgroundColor: theme.colors.primary,
                padding: 10,
                margin: 15,
                height: 40,
            }}
                onPress={onSubmit}
                testID='testSubmitReviewButton'
            >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Create a review</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateReview;