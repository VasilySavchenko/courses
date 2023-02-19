/**
 * HttpClient is a custom wrapper around fetch api.
 * Exposes get, post and delete methods for JSON.
 */

interface Get {
    path: string;
    authToken?: string;
}

interface Do {
    method: string;
    path: string;
    body?: string;
    authToken?: string;
}

export class HttpClient {
    /**
     * Performs POST http request with JSON body.
     * @param path
     * @param body serialized JSON
     * @param authToken
     */
    public async post(
        path: string,
        body?: string,
        authToken?: string
    ): Promise<Response> {
        return await this.do({ method: 'POST', path, body, authToken });
    }

    /**
     * Performs PATCH http request with JSON body.
     * @param path
     * @param body serialized JSON
     */
    public async patch(
        path: string,
        body?: string,
        authToken?: string
    ): Promise<Response> {
        return await this.do({ method: 'PATCH', path, body, authToken });
    }

    /**
     * Performs PUT http request with JSON body.
     * @param path
     * @param body serialized JSON
     * @param _auth indicates if authentication is needed
     */
    public async put(
        path: string,
        body?: string,
        authToken?: string
    ): Promise<Response> {
        return await this.do({ method: 'PUT', path, body, authToken });
    }

    /**
     * Performs GET http request.
     * @param path
     * @param authToken indicates if authentication is needed
     */
    public async get({ path, authToken }: Get): Promise<Response> {
        return await this.do({ method: 'GET', path, authToken });
    }

    /**
     * Performs DELETE http request.
     * @param path
     * @param _auth indicates if authentication is needed
     */
    /**
     * Right now needs body here. */
    public async delete(
        path: string,
        body?: string,
        authToken?: string
    ): Promise<Response> {
        return await this.do({ method: 'DELETE', path, body, authToken });
    }

    /**
     * do sends an HTTP request and returns an HTTP response as configured on the client.
     * @param method holds http method type
     * @param path
     * @param body serialized JSON
     * @param authToken authoritarian token
     */
    private async do({ method, path, body, authToken }: Do): Promise<Response> {
        const request: RequestInit = {
            method: method,
            body: body,
        };

        if (authToken) {
            request.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            };
        } else {
            request.headers = {
                'Content-Type': 'application/json',
            };
        }

        return await fetch(path, request);
    }
}
