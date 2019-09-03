const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = '...'

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : "jklein",
      password      : mypw,
      connectString : "CMSDev_DBS"
    });

    const result = await connection.execute(
      `SELECT GENDER, DATEOFBIRTH, EMPID, ADDRESS, EMPNAME, EMAILID, PINCODE
      FROM JKLEIN.EMPLOYEEDETAILS`,
      // bind value for :id
    );
    console.log(result.rows);
    console.log(`Number of rows retrieved ${result.rows.length}`);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
