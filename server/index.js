const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const CellData = require("../util/cellDataSchema");
const { connectTunnel } = require("./connectDB");

connectTunnel();
app.use(bodyParser.json());
app.use(express.static("dist"));
app.post("/api", async (req, res) => {
    data = req.body;
    await CellData.create({
        firstName: data["FirstName"],
        lastName: data["LastName"],
        job: data["job"],
        exp: {
            machine: data["machine"],
            id: data["id"],
            startDate: data["date"],
            extLink: data["extLink"],
            dataType: data["dataType"],
            cellType: data["cellType"],
            treatmentType: data["treatmentType"],
            dosage: data["dosage"],
        },
        Details: data["details"],
        dataInString: data["dataInString"],
    });
    res.json({ status: "ok" });
});

app.get("/searchApi", async (req, res) => {
    allData = await CellData.find();
    console.log(allData);
    res.json({ status: "ok", data: allData });
});

app.get("/deleteApi", async (req, res) => {
    allData = await CellData.remove({});
    console.log(allData);
    res.json({ status: "ok", data: allData });
});
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000!"));
