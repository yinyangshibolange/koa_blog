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

export const getUserById = (id: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from user where id = ?', id, function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const getUserByKeyword = (username: string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from user where username = ? or email = ?', [username, username], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const updateUserPassword = (password: string, id: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('update user set password = ? where id = ?', [password, id], function (error: Error, results: any, field: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const updateUserEmail = (email: string, id: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('update user set email = ? where id = ?', [email, id], function (error: Error, results: any, field: any) {
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

