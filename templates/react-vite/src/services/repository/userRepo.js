//These repository files will be responsible for the flow of loaders and then sending the data to the connector along with the specific endpoint.
//i.e frontend pages will call the functions from thsese repo and then pass data to this and this function will decide the further actions/
//i.e enabling the loader, which endpoint should be called, after receiving the response what to do, toasting the required messages and at last defusing loaders.
import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import {
  setAccount,
  setAccountAfterRegister,
  setDFeature,
} from '../../app/DashboardSlice';
import { authEndpoints } from '../Apis';
const { LOGIN_API, REGISTER, VALIDATE_GMAIL, GOOGLE_SIGN_IN } = authEndpoints;

export function login(email_id, password, navigate) {
  return async (dispatch) => {
    const loadingToast = toast.loading('Letting you in...');
    try {
      const response = await apiConnector('POST', LOGIN_API, {
        email_id,
        password,
      });

      console.log('Login API response : ', response);
      if (response.data.success) {
        toast.success('Login Successful..');
        const temp = {
          id: response.data.data.u_id,
          uname: response.data.data.name,
          uemail: response.data.data.email,
          token: response.data.data.token,
          role_id: response.data.data.role_id,
          role: response.data.data.role,
          is_new: response.data.data.isNew,
        };
        dispatch(setAccount(temp));
        if (response.data.data.isNew) {
          dispatch(
            setDFeature({
              dashboardFeature: 'Home',
            }),
          );
          navigate('/dashboard');
        } else {
          dispatch(
            setDFeature({
              dashboardFeature: 'Home',
            }),
          );
          navigate('/dashboard');
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log('Login API Error....', error);
      console.log('Login API Error....', error.response?.data?.message);

      toast.error(error.response?.data?.message);
    }
    toast.dismiss(loadingToast);
  };
}

export function authEmail(userId, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading('Validating OTP..');
    try {
      const response = await apiConnector('POST', VALIDATE_GMAIL, {
        userId,
        otp,
      });
      console.log('Validate API response : ', response);
      if (response.data.success) {
        toast.success('Validation Successful..');
        navigate('/login');
        toast('Please Login...');
        console.log(response);
      } else {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log('VALIDATION API Error....', error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function register(name, email_id, password, mobile, navigate) {
  return async (dispatch) => {
    const loadingToast = toast.loading('Registering you...');
    try {
      const response = await apiConnector('POST', REGISTER, {
        name,
        email_id,
        mobile,
        password,
      });
      console.log('Register API response : ', response.data.data);
      if (response.data.success) {
        toast.success('Registration Successful..');
        const temp = {
          id: response.data.data.u_id,
          uname: response.data.data.name,
          uemail: response.data.data.email,
        };
        console.log(temp);
        dispatch(setAccountAfterRegister(temp));
        navigate('/verify-email');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log('Register API Error....', error);
      toast.error(error.response?.data?.message);
    }
    toast.dismiss(loadingToast);
  };
}

export function loginWithGoogle(credentialResponse, navigate) {
  return async (dispatch) => {
    const loadingToast = toast.loading('Signing in with Google...');
    try {
      const response = await apiConnector('POST', GOOGLE_SIGN_IN, {
        credential: credentialResponse.credential,
      });

      console.log('Google Sign-In API response: ', response);

      if (response.data.success) {
        toast.success('Google Sign-In Successful!');

        const temp = {
          id: response.data.data.data.u_id,
          uname: response.data.data.data.name,
          uemail: response.data.data.data.email,
          token: response.data.data.data.token,
          is_new: response.data.data.data.isNew,
        };
        console.log(temp);

        dispatch(setAccount(temp));

        if (response.data.data.isNew) {
          dispatch(
            setDFeature({
              dashboardFeature: 'Home',
            }),
          );
          navigate('/dashboard');
        } else {
          dispatch(
            setDFeature({
              dashboardFeature: 'Home',
            }),
          );
          navigate('/dashboard');
        }
      } else {
        throw new Error(response.data.message || 'Sign-in failed');
      }
    } catch (error) {
      console.log('Google Sign-In API Error:', error);
      console.log(
        'Google Sign-In API Error Details:',
        error.response?.data?.message,
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to sign in with Google',
      );
    }

    toast.dismiss(loadingToast);
  };
}
