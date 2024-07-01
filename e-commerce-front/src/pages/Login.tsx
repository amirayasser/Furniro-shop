import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/forms/Input";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import Button from "react-bootstrap/Button";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {actAuthLogin, resetUI} from "@store/auth/authSlice";
import { signInSchema, signInType } from "src/validation/login";
import { useEffect } from "react";



const Login = () => {

  
  
  const dispatch = useAppDispatch();
  const {loading , error  } = useAppSelector(state => state.authSlice)
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

  

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<signInType> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };


  const { emailAvailabilityStatus, prevEmail, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && prevEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && !invalid && prevEmail) {
      resetCheckEmailAvailability(value);
    }
  };


  useEffect(()=>{
    return()=>{
      dispatch(resetUI())
    }
  },[dispatch])

  return (
  <>
  {
        searchParams.get('message') === 'account_created' && 
        <Alert variant="success">your account successfully created, please login</Alert>
  }  
  {
        searchParams.get('message') === 'login_required' && 
        <Alert variant="info">Login is required to access profile page.</Alert>
  }  

  
   
    <Form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "90%", padding: "30px" }}
    >
      
      <Input
        name="email"
        label="Email Address"
        register={register}
        onBlur={emailOnBlurHandler}
        formText={emailAvailabilityStatus === 'checking'
          ? "We're currently checking the availability of this email address. Please wait a moment."
          : ''}
        success={emailAvailabilityStatus === 'notAvailable' ? 'This email is existed' : ''}
        error={
          errors.email?.message
            ? errors.email?.message
            : emailAvailabilityStatus === "available"
              ? "This email is not existed."
              : emailAvailabilityStatus === "failed"
                ? "Error from the server."
                : ""
        }

        disabled={emailAvailabilityStatus === 'checking' ? true : false}

      />

      <Input
        name="password"
        label="Password"
        register={register}
        error={errors.password?.message}
        type="password"
      />
      

      <Button
        type="submit"
        className="w-50 rounded-1 mt-3 py-2"
        style={{
          backgroundColor: "#B88E2F",
          border: "none",
          fontWeight:'600',
          fontSize:'1.1rem',
          textTransform:'capitalize',
          marginLeft:'50%',
          marginRight:'50%',
          transform:'translate(-50%, 0%)'
        }}
          disabled={emailAvailabilityStatus === 'checking'
            ? true
            : false || loading === 'pending'
          }
        >
          {loading === 'pending' ?
            <>
              <Spinner animation="border" size="sm" /> {' '} loading...
            </>
            : 'sign in'}
      </Button>
        {error &&
         <p 
          style={{ color: "#dc3545", marginTop: "25px", marginInline: "auto", textAlign: 'center', fontWeight: '500' }}
          >
          {error}  
          </p>}
    </Form>
    
  </>
  );
};

export default Login
