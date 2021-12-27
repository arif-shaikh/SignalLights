import { json } from "body-parser";
import express from "express";
import { SignalHandler } from "./signalHandler"
import { LightState } from "../shared/model/signal"
import cors from "cors";

const app = express();
const port = 5000;


let signalHandler = new SignalHandler();

app.use(cors({ origin: true }));
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(signalHandler.getState())
});

app.get('/startnorthsouth', (req, res) => {
    console.log("Starting North And South");
    signalHandler.startNorthAndSouth();
    res.redirect("/");
});
app.get('/starteastwest', (req, res) => {
    console.log("Starting East And West");
    signalHandler.startEastAndWest();
    res.redirect("/");
});
app.get('/stopall', (req, res) => {
    console.log("Stopping all signals");
    signalHandler.stopAll();
    res.redirect("/");
});
app.get('/togglemanual', (req, res) => {
    console.log("toggling manual");
    signalHandler.toggleManual();
    res.redirect("/");
});

app.listen(port, () => {
    console.log("listening on port: ", port);
})