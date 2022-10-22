"use strict";
const { request } = require("gaxios");

/* eslint-disable no-unused-vars */

// [START functions_helloworld_http]
// [START functions_helloworld_get]
const functions = require("@google-cloud/functions-framework");
// [END functions_helloworld_get]
// [END functions_helloworld_http]

// [START functions_helloworld_get]

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http("helloGET", (req, res) => {
    res.send("Hello World!");
});

functions.http("csModsGET", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    const resp = await request({
        url: "https://api.nusmods.com/v2/2022-2023/moduleList.json",
    });
    const modules = resp.data;
    const csmodules = modules.filter((module) => {
        return module.moduleCode.includes("CS");
    });
    res.send(csmodules);
});
