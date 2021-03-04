import { json } from "body-parser";
import express from "express";
import {SignalHandler} from "./signalHandler"
import {LightState } from "../shared/model/signal"
const cors = require("cors");


const app = express ();
const port = 5000;

app.use(cors());
app.use(express.static("assets"));
  

let signalHandler = new SignalHandler ();


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ state: signalHandler.isManual,
        north: signalHandler.signalNorth2South.state,
        south: signalHandler.signalSouth2North.state,
        east: signalHandler.signalEast2West.state,
        west: signalHandler.signalWest2East.state,
    }));
});
app.get('/startnorthsouth', (req, res) => {
    console.log ("Starting north and south");
    signalHandler.startNorthAndSouth();
    res.status(200).end();
});
app.get('/starteastwest', (req, res) => {
    console.log ("starting east and west");
    signalHandler.startEastAndWest();
    res.status(200).end();
});
app.get('/stopall', (req, res) => {
    console.log("stopping all");
    signalHandler.stopAll();
    res.status(200).end();
});
app.get('/togglemanual', (req, res) => {
    console.log("toggle manual");
    signalHandler.toggleManual();
    res.status(200).end();
});

app.listen(port, () => {
    console.log("listening on port: ", port);
})
