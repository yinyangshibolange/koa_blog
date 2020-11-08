import connection from "../connection";
import {KeyValue} from "../../types";
export const getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('select * from user', function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const getUserByKeyword = (name: string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from user where name = ? or email = ?', [name, name], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const addUser = (user: KeyValue) => {
    return new Promise((resolve, reject) => {
        connection.query('insert into user set ?', user, function (error: Error, results: any, field: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

