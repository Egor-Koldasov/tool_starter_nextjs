import { AxiosRequestConfig } from 'axios';
const defaults = jest.requireActual('axios/lib/defaults');

const mockAdapter = async (config: AxiosRequestConfig) => {
  var adapter;
  if (typeof window !== 'undefined' && typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter(config);
}

export default {
  ...defaults,
  adapter: mockAdapter,
}