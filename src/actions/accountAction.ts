import api from '~/api';
export async function login(username: string, password: string) {
    const response = await api.post('/account/login', { username, password });
    return response;
}
export async function logout() {
    const response = await api.post('/account/logout');
    return response;
}
export async function getAccountRole(username: string) {
    const response = await api.get(`/account/role?username=${username}`);
    return response.data;
}