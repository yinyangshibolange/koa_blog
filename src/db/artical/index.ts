import connection from "../connection";
import { KeyValue } from '../../types'
export const getArticals = (params: KeyValue) => {
    const { userid } = params
    return new Promise((resolve, reject) => {
        connection.query('select * from artical where user = ?', [ userid ], function (error: any, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if (error) {
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

export const addArtical = (artical: KeyValue) => {
    return new Promise((resolve, reject) => {
        connection.query('insert into artical set ?', artical, function (error: any, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if (error) {
                reject(error);
                return;
            }
            console.log(results.insertId);
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            resolve(results.insertId)
        })
    })
}

export const updateArtical = (artical: KeyValue) => {
    return new Promise((resolve, reject) => {
        connection.query('update artical set ? where id = ?', [artical, artical.id], function (error: any, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if (error) {
                reject(error);
                return;
            }
            console.log(results);
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            resolve(results)
        })
    })
}

export const deleteArtical = (id: number) => {
    return new Promise((resolve, reject) => {
        connection.query('delete from artical where id = ?', id, function (error: any, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if (error) {
                reject(error);
                return;
            }
            console.log('deleted ' + results.affectedRows + ' rows');
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            resolve(results)
        })
    })
}