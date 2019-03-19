import {API_URL} from './endpoints';
import restApi from '.';
import { AxiosPromise } from 'axios';

export const HTTP_VERBS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export class ApiService {

  constructor() {

  }

  static getUrl(endpoint: string, params: object = {}) {
    let url = API_URL.API + API_URL.API_PREFIX + endpoint;
    const regex = /{([A-Za-z0-9_]+)}/g;
    let match = regex.exec(url);
    while (match != null) {
      let newQueryVal = '';
      if (params[match[1]] !== null && params[match[1]] !== undefined) {
        newQueryVal = `${params[match[1]]}`;
      }
      url = url.replace(`{${match[1]}}`, newQueryVal);
      match = regex.exec(url);
    }
    return url;
  }

  getQueryString(params: object = {}) {
    let query = '';
    Object.keys(params).forEach(currentKey => {
      if (params[currentKey]) {
        query =
          (query ? `${query}&` : '') + currentKey + '=' + params[currentKey];
      }
    });
    return query;
  }

  static compileUrl(url: string, queryString: string) {
    if (!queryString) {
      return url;
    }
    if (url.indexOf('?') !== -1) {
      return url + '&' + queryString;
    }
    return url + '?' + queryString;
  }

  request(
    verb: string,
    endpoint: string,
    urlParams: object = {},
    params: object = {},
    includeToken = true,
    useFormData = false
  ): AxiosPromise {
    console.log(`request to github with verb ${verb} , endpoint: ${endpoint}
    , urlParams: ${urlParams}, params: ${params}, includeToken: ${includeToken}, useFormData: ${useFormData}`);
    const url = ApiService.getUrl(endpoint, urlParams);
    let queryString = '';
    if ([HTTP_VERBS.POST, HTTP_VERBS.PUT].indexOf(verb) === -1) {
      queryString = this.getQueryString(params);
    }
    let formData = null;
    if (useFormData) {
      formData = new FormData();
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
    }
    const options = {};
    let request;
    switch (verb) {
      case HTTP_VERBS.POST:
        request = restApi.post(
          url,
          useFormData && formData ? formData : params,
          options
        );
        break;

      case HTTP_VERBS.PUT:
        request = restApi.put(
          url,
          useFormData && formData ? formData : params,
          options
        );
        break;

      case HTTP_VERBS.DELETE:
        request = restApi.delete(
          ApiService.compileUrl(url, queryString),
          options
        );
        break;

      default:
        request = restApi.get(ApiService.compileUrl(url, queryString), options);
        break;
    }
    
    return request;
  }

}