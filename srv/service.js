const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = async (srv) => {

    const { employee } = srv.entities;

    // Before Create (POST)
    srv.before('CREATE', employee, async (req) => {

        const tx = cds.tx(req);
        const row = await tx.run(
            SELECT.one.from(employee).columns`max(employeeID) as MaxID`
        )

        console.log(row.MaxID);

        const maxID = row.MaxID;
        let nextID = '';
        if (maxID != undefined) {
            nextID = (parseInt(maxID) + 1).toString();
        } else {
            nextID = '1001'
        }

        req.data.employeeID = nextID;
        
    });

};