const express = require('express')
const app = express()
const port = 3000

const { getTenantModel } = require("./admindb");
const { getCustomerModel } = require("./tenantdb");

app.get('/tenant', async (req, res) => {
    let tenantId = req.query.tenantId;
    let tenantModel = await getTenantModel();
    const tenant = new tenantModel({ id: tenantId, name: tenantId });
    let doc = await tenantModel.findOneAndUpdate({ id: tenantId }, { id: tenantId, name: tenantId });
    if (!doc) {
        tenant.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(tenant))
})

app.get('/customer', async (req, res) => {
    let tenantId = req.query.tenantId;
    let customerName = req.query.customer;
    let tenantModel = await getTenantModel();
    let tenant = await tenantModel.findOne({ id: tenantId })
    if (!tenant)
        res.sendStatus(404) // tenant not found. Register tenant
    let customerModel = await getCustomerModel(tenantId);
    const customer = new customerModel({ customerName });
    let doc = await customerModel.findOneAndUpdate({ customerName }, { customerName });
    if (!doc) {
        customer.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(customer))
})


app.listen(port, () => {
    console.log(`listening ${port}`)
})

//I am going to add/register two tenants.
//Now I am goint to add customer for each tenant.