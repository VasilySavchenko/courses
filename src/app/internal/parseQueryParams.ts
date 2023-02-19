export interface IQueryParams {
    limit?: number;
    page?: number;
    search?: string;
    name?: string;
    order?: string;
    size?: number;
}

export const parseQueryParams = (queryParams: IQueryParams) => {
    const DEFAULT_INDEX = 0;
    const FIRST_INDEX = 1;

    const LAST_INDEX = Object.keys(queryParams).length - FIRST_INDEX;

    return Object.entries(queryParams).reduce((requestValue, [key, value], index) => {
        const paramsConfig = `${key}=${value}`;

        if (index === DEFAULT_INDEX) {
            requestValue = '?';
        }

        if (index === LAST_INDEX) {
            requestValue += paramsConfig;
        } else {
            requestValue += `${paramsConfig}&`;
        }

        return requestValue;
    }, '');
};
