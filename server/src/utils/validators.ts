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
            errors.message = "Field should not be empty";
        }
        
    if(!checkUniqueUsername(username))
        error.message = "Not a Valid Username";

    return {
        message:Object.values(errors)[0],
        valid: Object.keys(errors).length < 1
    };
};

const checkUniqueUsername = (username:string):boolean => {
    
}