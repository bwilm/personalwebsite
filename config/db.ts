import * as mysql from 'mysql';

export let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bloguser',
    password: 'password',
    database: 'AngularBlog'
});

function callProcedure(procedureName: string, args: Array<any> = []): Promise<Array<Array<any>>> {
    return new Promise(function(resolve:any, reject:any) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                let placeholders = '';
                if (args && args.length > 0) {
                    for (let i = 0; i < args.length; i++) {
                        if (i === args.length - 1) { // if we are on the last argument in the array
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                let callString = 'CALL ' + procedureName + '(' + placeholders + ');'; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
                connection.query(callString, args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

export function rows(procedureName: string, args: Array<any> = []) {
    return callProcedure(procedureName, args)
            .then((resultsets) => {
                return resultsets[0];
            });
}

export function row(procedureName: string, args: Array<any> = []) {
    return callProcedure(procedureName, args)
            .then((resultsets) => {
                return resultsets[0][0];
            });
}

export function empty(procedureName: string, args: Array<any> = []) {
    return callProcedure(procedureName, args)
            .then(() => {
                return;
            });
}