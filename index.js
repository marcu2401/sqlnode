const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "leltar",
    user: "leltar",
    password: "leltar_123"
});


connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
    console.log("Lekérdezés");

    const myQuery = " SELECT gep.hely, gep.ipcim, szoftver.nev FROM gep INNER JOIN telepites ON telepites.gepid=gep.id INNER JOIN szoftver ON telepites.szoftverid=szoftver.id WHERE YEAR(datum)=2016  GROUP BY szoftverid  HAVING COUNT(telepites.id)>1;";
    
    connection.query(myQuery, (err, result, fields) => {
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('-----------------------------');

        console.log("1. lekérdezés:");
        const sorok = JSON.parse(JSON.stringify(result));
        //console.log(sorok);
        for (sor of sorok) {
            console.log( `Gepek: ${sor.hely}, ${sor.ipcim}, ${sor.nev} `);
        }
    
    });
    const myQuery2=" SELECT  gep.ipcim  FROM gep INNER JOIN telepites ON telepites.gepid=gep.id INNER JOIN szoftver ON telepites.szoftverid=szoftver.id WHERE szoftver.nev IN(SELECT nev FROM szoftver WHERE nev='Google Chrome' OR nev='Mozilla Firefox');" ;
    connection.query(myQuery2, (err, result, fields) => {
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('-----------------------------');

        console.log("2. lekérdezés:");
        const sorok = JSON.parse(JSON.stringify(result));

        for (sor of sorok) {
            console.log( `Gep: ${sor.ipcim} `);
        }
    
    });

    console.log("Törlés!")
    const myQuery3="DELETE FROM szoftver WHERE kategoria LIKE '%demo%';" ;
    connection.query(myQuery3, (err, result,) => {
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('-----------------------------');

        console.log("3. lekérdezés:");
        const sorok = JSON.parse(JSON.stringify(result));
     
        console.log( `Törölt gépek: ${result.affectedRows} `);
        
    
    });

    console.log("Adatbeszúrás")
    const myQuery4="INSERT INTO  gep (hely, tipus, ipcim) VALUES('202','notebook', '172.16.0.102');" ;
    connection.query(myQuery4, (err, result,) => {
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('-----------------------------');

        console.log("4. lekérdezés:");
        const sorok = JSON.parse(JSON.stringify(result));
     
        console.log( `Müdosított verzió: ${result.affectedRows} `);
        
    
    });
    
    console.log("Adatmódosítás")
    const myQuery5="UPDATE telepites SET verzio='1.0.0' WHERE verzio IS NULL;" ;
    connection.query(myQuery5, (err, result,) => {
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('-----------------------------');

        console.log("5. lekérdezés:");
        const sorok = JSON.parse(JSON.stringify(result));
     
        console.log( `Müdosított verzió: ${result.affectedRows} `);
        
    
    });
    
    connection.end();

});

    
