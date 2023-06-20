import request from '@/utils/request.ts'
export function login(data){
    return request.post('/api/auth/login',data)
}
export function user(){
    return request(
        {
            url: '/api/admin/user',
            method: 'GET',
        }
    );
}

export function logout() {
    return request(
        {
            url: '/api/auth/logout',
            method: 'POST',
        }
    );
}