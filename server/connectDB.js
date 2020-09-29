var fs = require("fs");
var mongoose = require("mongoose");

var tunnel = require("tunnel-ssh");
var conData = require("../util/config.json");
//===== db connection =====

const config = {
    username: conData["username"],
    privateKey: require("fs").readFileSync(conData["sshAuthfile"]),
    host: conData["hostIp"], //IP adress of VPS which is the SSH server
    port: 22,
    dstHost: conData["mongoLink"],
    dstPort: 27017,
    localHost: "127.0.0.1",
    localPort: 27017, //or anything else unused you want
};

const connectionProperties = {
    sslValidate: false,
    ssl: true,
    sslCA: [fs.readFileSync(conData["CA"])],
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authMechanism: "SCRAM-SHA-1",
    auth: {
        user: "cco",
        password: conData["pwd"],
    },
    tlsAllowInvalidHostnames: true,
    tlsAllowInvalidCertificates: true,
};

exports.connectTunnel = () => {
    tunnel(config, function (error, server) {
        if (error) {
            console.log("SSH connection error: " + error);
        }
        mongoose.connect("mongodb://localhost:27017/cellData", connectionProperties);

        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "DB connection error:"));
        db.once("open", async function () {
            // we're connected!
            console.log("DB connection successful");
        });
    });
};
