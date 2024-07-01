import React from "react";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";



type TInputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  error,
  onBlur,
  register,
  formText,
  success,
  disabled
}: TInputProps<TFieldValue>) => {

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>)=>
    {
        if(onBlur){
          onBlur(e);
          register(name).onBlur(e)
        }else{
          register(name).onBlur(e)
        }
    };

  return (
    <Form.Group className="mb-4">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        {...register(name)}

        onBlur={onBlurHandler}

        isInvalid={error ? true : false}
        isValid={success ? true : false}

        disabled={disabled}
        
      />
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
