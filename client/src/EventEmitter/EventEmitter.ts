import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

export enum Events {
    SHOW_MODAL = 'show_modal',
    HIDE_MODAL = 'hide_modal',
    SHOW_NOTIFICATION = 'show_notification'
}

export default eventEmitter;