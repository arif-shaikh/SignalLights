import { json } from "body-parser";
import express from "express";
import {SignalHandler} from "./signalHandler"
import {LightState } from "../shared/model/signal"
const app = express ();
const port = 5000;


let signalHandler = new SignalHandler ();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ state: signalHandler.isManual,
        north: LightState[signalHandler.signalNorth2South.state],
        south: LightState[signalHandler.signalSouth2North.state],
        east: LightState[signalHandler.signalEast2West.state],
        west: LightState[signalHandler.signalWest2East.state],
    }));
});
app.get('/startnorthsouth', (req, res) => {
    signalHandler.startNorthAndSouth();
    res.status(200).end();
});
app.get('/starteastwest', (req, res) => {
    signalHandler.startEastAndWest();
    res.status(200).end();
});
app.get('/stopall', (req, res) => {
    signalHandler.stopAll();
    res.status(200).end();
});
app.get('/togglemanual', (req, res) => {
    signalHandler.toggleManual();
    res.status(200).end();
});

app.listen(port, () => {
    console.log("listening on port: ", port);
})