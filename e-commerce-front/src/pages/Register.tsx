import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/forms/Input";
import { RegisterInputs, registerSchema } from "src/validation/register";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import Button from "react-bootstrap/Button";
import { Form, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.authSlice);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<RegisterInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    const { name, email, password } = data;
    dispatch(actAuthRegister({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/contact/login?message=account_created");
      });
  };

  const {
    emailAvailabilityStatus,
    prevEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

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

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return (
    <Form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "90%", padding: "30px" }}
    >
      <Input
        name="name"
        label="Your Name"
        register={register}
        error={errors.name?.message}
      />
      <Input
        name="email"
        label="Email Address"
        register={register}
        onBlur={emailOnBlurHandler}
        formText={
          emailAvailabilityStatus === "checking"
            ? "We're currently checking the availability of this email address. Please wait a moment."
            : ""
        }
        success={
          emailAvailabilityStatus === "available"
            ? "This email is available for use"
            : ""
        }
        error={
          errors.email?.message
            ? errors.email?.message
            : emailAvailabilityStatus === "notAvailable"
              ? "This email is already in use."
              : emailAvailabilityStatus === "failed"
                ? "Error from the server."
                : ""
        }
        disabled={emailAvailabilityStatus === "checking" ? true : false}
      />

      <Input
        name="password"
        label="Password"
        register={register}
        error={errors.password?.message}
        type="password"
      />
      <Input
        name="confirmPassword"
        label="Confirm Password"
        register={register}
        error={errors.confirmPassword?.message}
        type="password"
      />

      <Button
        type="submit"
        className="w-50 rounded-1 mt-2 py-2"
        style={{
          backgroundColor: "#B88E2F",
          border: "none",
          fontWeight: "600",
          fontSize: "1.1rem",
          textTransform: "capitalize",
          marginLeft: "50%",
          marginRight: "50%",
          transform: "translate(-50%, 0%)",
        }}
        disabled={
          emailAvailabilityStatus === "checking"
            ? true
            : false || loading === "pending"
        }
      >
        {loading === "pending" ? (
          <>
            <Spinner animation="border" size="sm" /> loading...
          </>
        ) : (
          "sign up"
        )}
      </Button>
      {error && (
        <p
          style={{ color: "#dc3545", marginTop: "25px", marginInline: "auto", textAlign: 'center' ,fontWeight:'500'}}
        >
          {error}
        </p>
      )}
    </Form>
  );
};

export default Register;
