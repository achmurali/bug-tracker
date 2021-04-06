export interface Error{
    message?:string
}

interface AuthErrors extends Error{
    username?:string,
    password?:string
};


export const loginValidator = (username: string, password: string) => {
  const errors: AuthErrors = {};

  if (!username || username.trim() === '') {
    errors.username = 'Username field must not be empty.';
  }

  if (!password) {
    errors.password = 'Password field must not be empty.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const signupValidator = (username:string,password:string,confirmpassword:string) => {
    const error: Error = {};

    if(!username || username.trim() === "" || 
        !password || password.trim() === "" ||
         !confirmpassword || confirmpassword.trim() === ""){
            error.message = "Field should not be empty";
        }
    
    return error;
};