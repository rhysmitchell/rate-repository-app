import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', async () => {
        const onSubmit = jest.fn();

        const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

        await act(async () => fireEvent.changeText(getByTestId('testUsername'), 'kalle'));
        await act(async () => fireEvent.changeText(getByTestId('testPassword'), 'password'));
        await act(async () => fireEvent.press(getByTestId('testSubmitButton')));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'kalle',
                password: 'password',
            });
        });
    });
});