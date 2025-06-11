export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const setUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
};

export const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}; 