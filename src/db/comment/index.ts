import connection from "../connection";
import {KeyValue} from "../../types";

export const getComments = (artical: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from comment where artical = ? order by time desc', [ artical ], function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            // console.log(fields)
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            resolve(results)
        })
    })
}

export const comment = (comment: KeyValue) => {
    return new Promise((resolve, reject) => {
        connection.query('insert into commnet set ?', comment,  function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            // console.log(fields)
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            resolve(results)
        })
    })
}