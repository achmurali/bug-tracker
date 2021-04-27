export interface Error{
    message?:string,
    valid?: boolean
}

interface AuthInput {
    username?:string,
    password?:string,
    message?:string,
    confirmpassword?:string
};


export const loginValidator = (username: string, password: string):Error => {
  const errors: AuthInput = {};

  if (!username || username.trim() === '') {
    errors.username = 'Username field must not be empty.';
  }

  if (!password) {
    errors.password = 'Password field must not be empty.';
  }

  return {
    message: Object.values(errors)[0],
    valid: Object.keys(errors).length < 1,
  };
};

export const signupValidator = (username:string,password:string,confirmpassword:string) => {
    const errors: AuthInput = {};

    if(!username || username.trim() === "" || 
        !password || password.trim() === "" ||
         !confirmpassword || confirmpassword.trim() === ""){
            errors.message = "Fields should not be empty";
        }
    if(password != confirmpassword)
        throw new Error("Passwords dont tally");
    
    return {
        message:Object.values(errors)[0],
        valid: Object.keys(errors).length < 1
    };
};

export const checkRequestBody = (req:any,parameters:Array<string>) => {
  let flag:boolean = false;
  const res =  parameters.map((ele) => {
    console.log(req[ele])
    if(req[ele] === undefined || req[ele] === null)
      flag = true;
    return req[ele];
  });
  if(flag)
    throw new Error("Bad Request")
  return res;
};

