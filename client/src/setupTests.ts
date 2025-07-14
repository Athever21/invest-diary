import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


loadDevMessages();
loadErrorMessages();


if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder as any;
}
if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder as any;
}