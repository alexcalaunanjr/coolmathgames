import React from 'react';
import { Label, TextInput } from "flowbite-react";

function Input({type, placeholder}) {
  return (
    <TextInput type={type} placeholder={placeholder}/>
  );
}

export default Input;