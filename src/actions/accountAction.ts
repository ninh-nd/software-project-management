import authAPI from '../auth';
export async function login(username: string, password: string) {
    const response = await authAPI.post('/login', { username, password });
    return response.data;
}