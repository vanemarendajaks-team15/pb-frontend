import axios from 'axios';

/**
 * Shared Axios instance for JSON API calls to the Laravel app.
 * CSRF: Laravel sets the XSRF-TOKEN cookie; Axios sends X-XSRF-TOKEN automatically.
 */
export const http = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});
