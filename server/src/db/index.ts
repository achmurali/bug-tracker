import { Pool } from 'pg';
import { PoolClient } from '../../types/pg';
import connection from "../connection.json";

const pool = new Pool(connection);

const dbConfig = {
    async query(text:string, params?:Array<any>) {
    const start = Date.now();
    console.log('Current Query',{text});
    const res = await pool.query(text,params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
  async getClient() {
    const client = await pool.connect() as PoolClient;
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    // @ts-ignore
    client.query = (...args) => {
      client.lastQuery = args
      // @ts-ignore
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }
}

export default dbConfig;