import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Modal from './Modal';
import eventEmitter, { Events } from '../EventEmitter/EventEmitter';
import { ModalTypes } from './ModalTypes';

jest.mock('../SignInModal/SignInModal', () => () => <div>Sign In Modal</div>);
jest.mock('../SignUpModal/SignUpModal', () => () => <div>Sign Up Modal</div>);

describe('Modal', () => {
  it('renders SignInModal when SHOW_MODAL event is emitted with SIGN_IN', () => {
    render(<Modal />);
    act(() => {
      eventEmitter.emit(Events.SHOW_MODAL, ModalTypes.SIGN_IN);
    });
    expect(screen.getByText(/Sign In Modal/i)).toBeInTheDocument();
  });
}); 