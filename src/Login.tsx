import { useState } from 'react';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formikCustomerDetailsForm = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    onSubmit: async () => {
      try {
        setLoading(true);
        navigate('/orderBook');
      } catch (error) {}
    },
  });

  function userIdChange(event: { target: { value: any } }) {
    const newValue = event.target.value;
    formikCustomerDetailsForm.setFieldValue('userId', newValue);
  }

  function passwdChange(event: { target: { value: any } }) {
    const newValue = event.target.value;
    formikCustomerDetailsForm.setFieldValue('password', newValue);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="container">
        <div className="header-text">
          <Typography variant="h4">Assignment</Typography>
        </div>
        <div className="paper">
          <form onSubmit={formikCustomerDetailsForm.handleSubmit}>
            <div className="bs-form">
              <div className="form-group">
                <div className="input-wrapper">
                  <TextField
                    type="text"
                    id="userId"
                    name="userId"
                    label="Enter your UserId"
                    fullWidth
                    onChange={userIdChange}
                    inputProps={{ maxLength: 15 }}
                    value={formikCustomerDetailsForm.values.userId}
                    helperText={
                      formikCustomerDetailsForm.touched.userId &&
                      formikCustomerDetailsForm.errors.userId
                    }
                    error={
                      formikCustomerDetailsForm.touched.userId &&
                      !!formikCustomerDetailsForm.errors.userId
                    }
                    onBlur={(e) => formikCustomerDetailsForm.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <TextField
                    id="password"
                    name="password"
                    label="Enter your Password"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={formikCustomerDetailsForm.values.password}
                    onChange={passwdChange}
                    inputProps={{ maxLength: 20 }}
                    helperText={
                      formikCustomerDetailsForm.touched.password &&
                      formikCustomerDetailsForm.errors.password
                    }
                    error={
                      formikCustomerDetailsForm.touched.password &&
                      !!formikCustomerDetailsForm.errors.password
                    }
                    onBlur={(e) => formikCustomerDetailsForm.handleBlur(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {showPassword ? (
                            <VisibilityIcon
                              className="cursor-pointer"
                              onClick={togglePasswordVisibility}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className="cursor-pointer"
                              onClick={togglePasswordVisibility}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="button-wrapper">
                <LoadingButton
                  loading={loading}
                  type="submit"
                  loadingPosition="end"
                  fullWidth
                  variant="contained"
                  className="login-button"
                  endIcon={<></>}
                  disabled={
                    !(
                      formikCustomerDetailsForm.values.userId &&
                      formikCustomerDetailsForm.values.password
                    ) ||
                    !!formikCustomerDetailsForm.errors.userId ||
                    !!formikCustomerDetailsForm.errors.password
                  }
                >
                  Login
                </LoadingButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
