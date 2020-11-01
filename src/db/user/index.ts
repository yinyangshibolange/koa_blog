import connection from "../connection";
export const getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('select * from user', function (error: Error, results: any, fields: any) {
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