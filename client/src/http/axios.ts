import axios from 'axios';
import { MyError } from '../models/error';

const get = (url:string) => {

}

const post = async (url:string,data:any) => {
    try{
        const result = await axios.post(url,data);
        if(!result.data.success)
            throw new MyError(result.data.message,result.data.stack);
        return result.data;
    }
    catch(err){
        if(err.isAxiosError)
            throw new MyError(err.response.data.message,err.response.data.stack);
        else
            throw new MyError(err.message,err.stack);
    }
} 

const put = async () => {

};

const httpDelete= async () => {

};

const http = { get, post, put, httpDelete };

export default http;