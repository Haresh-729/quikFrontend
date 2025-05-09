//All the API endpoints will be declared here and then this will be used in entire frontend to access the endpoints...
const BaseURL = import.meta.env.VITE_API_BASE_URL;

export const authEndpoints = {
  LOGIN_API: BaseURL + 'auth/login',
  REGISTER: BaseURL + 'auth/register',
  VALIDATE_GMAIL: BaseURL + 'auth/validate',
  GOOGLE_SIGN_IN: BaseURL + 'auth/sign-in-google',
};

export const uploadEndPoints = {
  UPLOAD: BaseURL + 'upload/',
};
