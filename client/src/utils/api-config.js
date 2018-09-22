let backendHost;

if (process.env.NODE_ENV === 'production') {
  backendHost = 'http://138.68.103.39:5000';
} else {
  backendHost = 'http://localhost:5000';
}

export const API_ROOT = `${backendHost}/api/v1`;