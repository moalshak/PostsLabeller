function getBackendUrl() {
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
}


export { getBackendUrl };