let backendHost;

backendHost = process.env.BACKEND_HOST || 'http://localhost:5000';

export const API_ROOT = `${backendHost}/api`;