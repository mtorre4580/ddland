import axios, { AxiosResponse } from 'axios';

interface RequestMail {
    email: string;
}

function sendMail(request: RequestMail): Promise<AxiosResponse> {
    return axios.post('/api/mail', request);
}

export {
    sendMail,
}