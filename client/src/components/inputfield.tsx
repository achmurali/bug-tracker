import React from 'react';
import { TextField } from '@material-ui/core'
import { useController } from "react-hook-form";

const InputField:React.FC<any> = ({name,control,defaultValue, error, ...props}) => {
  const {
    field: { ref, ...fieldProps }
  } = useController({
    name,
    control,
    defaultValue
  });
  
  return (
    <TextField inputRef = {ref}
          {...fieldProps}
          {...props}  
          error = {error && true}
          helperText = {error && error.message}/>
  )
}

export default InputField;