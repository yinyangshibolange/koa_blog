import connection from "../connection";
import {KeyValue} from "../../types";

// 获取文章的所有标签
export const getArticalTags = (artical: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from artical_tags where artical = ?', [artical], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 注册文章中的标签
export const addArticalTag = (artical: number | string, tag: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('insert into artical_tags set artical = ? and tag = ?', [artical, tag], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 删除标签，只删除文章中的标签关系，
export const deleteArticalTag = (artical: number | string, tag: number | string) => {
    return new Promise((resolve, reject) => {
        connection.query('delete from artical_tags where artical = ? and tag = ?', [artical, tag], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 注册标签，需要注册关系也要注册详细
export const addTag = (tag: KeyValue) => {
    return new Promise((resolve, reject) => {
        connection.query('insert into tagcloud set ?', tag, function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 获取热门标签
export  const getHotTags = (hotn:number = 10) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT tag, count(1) count FROM artical_tags GROUP BY tag order by count desc LIMIT ?', hotn, function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const getTagByIds = (ids: any) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from tagcloud where id in (?)', ids, function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

export const searchTags = (keyword: string) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from tagcloud where name like \'%?%\'', keyword, function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 获取所有标签
export const getTags = () => {
    return new Promise((resolve, reject) => {
        connection.query('select * from tagcloud', function (error: Error, results: any, fields: any) {
            // error will be an Error if one occurred during the query
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}

// 获取tag详细， 入参为tag id数组
export const getTagNames = (tagids: number[] | string []) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from tagcloud where id in (?)', [tagids], function (error: Error, results: any, fields: any) {
            if(error) {
                reject(error);
                return;
            }
            resolve(results)
        })
    })
}