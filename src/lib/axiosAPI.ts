import axios, { AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { api } from '../constants';
import { RootState } from '../store';

export type GenericAppThunk<RootState> = ThunkAction<void, RootState, null, Action<string>>;

export interface ErrorI {
  message: string;
  success: boolean;
}

export enum APIStatus {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure',
  FailureEntry = 'FailureEntry',
  FailureBreak = 'FailureBreak',
  FailureWeekend = 'FailureWeekend',
}

export interface CallAPIParams {
  url: string;
  payload?: any;
  onSuccess?: (response: any, headers?: any) => void;
  includeHeaders?: string[];
  onError?: (errorResponse: any) => void;
  reducerData?: any;
  config?: AxiosRequestConfig;
  customBaseUrl?: string;
  nestedResponseType?: boolean;
}

export type CallAPI<AppThunk> = (params: CallAPIParams) => AppThunk;

const baseURL = api.backend_api;

export const getCallAPI =
  <RootState>(): CallAPI<GenericAppThunk<RootState>> =>
  props =>
  async () => {
    const { url, payload, onSuccess, onError, config, includeHeaders, customBaseUrl } = props;
    let response;

    // const controller = new AbortController();
    // const signal = controller.signal;
    // setTimeout(() => controller.abort(), 3000);

    try {
      const method = config?.method;

      if (method && method.toLowerCase() === 'get') {
        response = await axios.get((customBaseUrl || baseURL) + url, config);
      } else if (method && method.toLowerCase() === 'put') {
        response = await axios.put((customBaseUrl || baseURL) + url, payload, config);
      } else if (method && method.toLowerCase() === 'delete') {
        response = await axios.delete((customBaseUrl || baseURL) + url, config);
      } else {
        response = await axios.post((customBaseUrl || baseURL) + url, payload, config);
      }

      const headers = includeHeaders ? pick(response.headers, includeHeaders) : undefined;

      if (response.data && onSuccess) {
        onSuccess(response.data, headers);
      }
      if (!response.data && onError) {
        onError(response.data.message);
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        onError?.(error?.code);
      }
      if (onError && error && error.response && error.response.data) {
        if (error.response.data.errors) onError(error.response.data.errors);
        else onError(error.response.data.message);
      }
    }
  };

export const callAPI = getCallAPI<RootState>();

export interface APIRequestParams<Req, Res, ErrorType, Var> {
  payload?: Req;
  variables?: Var;
  onSuccess?: (response: Res) => void;
  onError?: (errorResponse: ErrorType) => void;
  config?: AxiosRequestConfig;
}

export type GenericAPIRequest<RootState, Req = null, Res = null, ErrorType = null, Var = null> = (
  params: APIRequestParams<Req, Res, ErrorType, Var>,
) => GenericAppThunk<RootState>;

export type APIRequest<Req = null, Res = null, ErrorType = null, Var = null> = GenericAPIRequest<
  RootState,
  Req,
  Res,
  ErrorType,
  Var
>;
