import { Pool } from 'pg';
import connection from "../connection.json";

const pool = new Pool(connection);

const dbConfig = {
    async query(text:string, params?:Array<any>) {
    const start = Date.now();
    const res = await pool.query(text,params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  }
}

export default dbConfig;