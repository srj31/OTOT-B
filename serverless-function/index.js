"use strict";

/* eslint-disable no-unused-vars */

// [START functions_helloworld_http]
// [START functions_helloworld_get]
const functions = require("@google-cloud/functions-framework");
// [END functions_helloworld_get]
const escapeHtml = require("escape-html");
// [END functions_helloworld_http]

// [START functions_helloworld_get]

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http("helloGET", (req, res) => {
    res.send("Hello World!");
});
