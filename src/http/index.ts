
export interface IHttpHeader extends Headers{

}
const getRequestInit: (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers?: { [key: string]: string | number },
  body?: any) => RequestInit =
  (method, headers, body) => {
    const allheaders: HeadersInit = {

      'Content-Type': 'application/json; charset=UTF-8',
      // 'Authorization': `Bearer ${localStorage.token}`,
      ...headers,
    };
    if (localStorage.token) {
      allheaders['Authorization'] = `Bearer ${localStorage.token}`;
    }
    // const requestInit: RequestInit =

    return {
      method: method,
      headers: allheaders,
      body: JSON.stringify(body),
    };
  };
export interface IHttpResponse<R> { headers: IHttpHeader, text: R }
export type IHttpFetch = <R>
  (requestUrl: string, requestInit: RequestInit) => Promise<
    { headers: IHttpHeader, text: R } | undefined>

export type IhtmlFetch = (type: 'r' | 'v') => Promise<
  { headers: IHttpHeader, text: any } | undefined
>
const assetJsonFetch: IhtmlFetch = async <R>(type: 'r' | 'v') => {
  const requestInit: RequestInit = getRequestInit('GET');
  const url = `/${type}/assets.json`;
  const response: Response = await fetch(url, requestInit);
  if (response.status >= 200 && response.status < 300) {
    const headers: IHttpHeader = response.headers;
    const responseStr: string = await response.text();
    let text: R;
    try {
      text = eval(`(${responseStr})`) as R;
    } catch (error) {
      text = responseStr as any;
    }

    const res: { headers: IHttpHeader, text: R } = {
      headers,
      text,
    };
    return res;
  } else if (response.status == 401) {
    // util.goLogin()
    return undefined;
  } else {
    return undefined;
  }
};


export interface IHttp {
  getStatic: (type: 'r' | 'v') => Promise<
    { headers: IHttpHeader; text: { [key: string]: any }; } | undefined
  >
}
export const Http: IHttp = {
  getStatic: async (type: 'r' | 'v') => {
    const result = await assetJsonFetch(type);
    return result;
  },
};
