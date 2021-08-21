import axios from 'axios';
import { MyError } from '../models/error';

const get = async (url:string,headers?:any) => {
    try{
        const result = await axios.get(url,headers);
        if(!result.data.success)
            throw new MyError(result.data.message,result.data.stack);

        delete result.data.success;
        return result.data;
    }
    catch(err:any){
        console.log(err.message);
        if(err.isAxiosError)
            throw new MyError(err.response.data.message,err.response.data.stack);
        else
            throw new MyError(err.message,err.stack);    
    }
}

const post = async (url:string,data:any,headers?:any) => {
    try{
        const result = await axios.post(url,data,headers);
        if(!result.data.success)
            throw new MyError(result.data.message,result.data.stack);
        
        delete result.data.success;
        return result.data;
    }
    catch(err:any){
        if(err.isAxiosError)
            throw new MyError(err.response.data.message,err.response.data.stack);
        else
            throw new MyError(err.message,err.stack);
    }
} 

const put = async (url:string,data:any,headers?:any) => {
    try{
        const result = await axios.put(url,data,headers);
        if(!result.data.success)
            throw new MyError(result.data.message,result.data.stack);

        delete result.data.success;
        return result.data;
    }
    catch(err:any){
        if(err.isAxiosError)
            throw new MyError(err.response.data.message,err.response.data.stack);
        else
            throw new MyError(err.message,err.stack);
    }
};

const httpDelete= async (url:string,headers?:any) => {
    try{
        const result = await axios.delete(url,headers);
        if(!result.data.success)
            throw new MyError(result.data.message,result.data.stack);

        delete result.data.success;
        return result.data;
    }
    catch(err:any){
        if(err.isAxiosError)
            throw new MyError(err.response.data.message,err.response.data.stack);
        else
            throw new MyError(err.message,err.stack);    
    }
};

const http = { get, post, put, httpDelete };

export default http;