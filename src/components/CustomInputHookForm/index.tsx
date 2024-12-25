import React from "react";
import { Form } from "react-bootstrap";
import { Controller, Control } from "react-hook-form";
import { IconType } from "react-icons";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  rules?: Record<string, any>;
  placeholder: string;
  type: string;
  icon?: IconType;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  errorClassName?: string;
}

const CustomInputHF: React.FC<CustomInputProps> = ({ name, control, rules, placeholder, type = "text", icon: Icon, containerClassName, inputClassName, iconClassName, errorClassName }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={containerClassName}>
          {Icon && (
            <span className={iconClassName}>
              <Icon />
            </span>
          )}
          <Form.Control {...field} type={type} placeholder={placeholder} className={`${inputClassName} ${error ? errorClassName : ""}`} />
          {error && <span className={errorClassName}>{error.message}</span>}
        </div>
      )}
    />
  );
};

export default CustomInputHF;
