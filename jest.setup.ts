import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/vue';
beforeEach(cleanup);

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn().mockReturnValue(new Uint8Array([])),
}));