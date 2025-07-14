import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Notifications from './Notifications';
import eventEmitter, { Events } from '../EventEmitter/EventEmitter';

describe('Notifications', () => {
  it('renders notification when event is emitted', () => {
    render(<Notifications />);
    act(() => {
      eventEmitter.emit(Events.SHOW_NOTIFICATION, { message: 'Test notification', type: 'success', time: 1 });
    });
    expect(screen.getByText(/Test notification/i)).toBeInTheDocument();
  });
}); 