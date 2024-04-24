import React from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

function InputEmail() {
  return (
    <div>
      <TextInput type="text" icon={HiMail} placeholder="name@email.com" required />
    </div>
  );
}

export default InputEmail;
