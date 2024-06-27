define(["postmonger"], function (Postmonger) {
    "use strict";

    var connection = new Postmonger.Session();
    var payload = {};

    $(window).ready(onRender);

    connection.on("initActivity", initialize);
    connection.on("requestedTokens", onGetTokens);
    connection.on("requestedEndpoints", onGetEndpoints);

    connection.on("clickedNext", onClickedNext);
    connection.on("clickedBack", onClickedBack);
    connection.on("gotoStep", onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger("ready");

        connection.trigger("requestTokens");
        connection.trigger("requestEndpoints");

    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        var message;
        var fromStation = "";
        var toStation = "";

        var hasInArguments = Boolean(
            payload["arguments"] &&
            payload["arguments"].execute &&
            payload["arguments"].execute.inArguments &&
            payload["arguments"].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments
            ? payload["arguments"].execute.inArguments
            : {};

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === "fromStation") {
                    fromStation = val;
                } else if (key === "toStation") {
                    toStation = val;
                }
            });
        });

        // Set the values of the input fields
        $("#fromstation").val(fromStation);
        $("#tostation").val(toStation);

        // Enable or disable the next button based on the input values
        connection.trigger("updateButton", {
            button: "next",
            enabled: Boolean(fromStation && toStation),
        });
    }

    function onGetTokens(tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        // console.log(tokens);
    }

    function onGetEndpoints(endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        // console.log(endpoints);
    }


    function save() {
        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property
        // may be overridden as desired.
        var fromStation = $("#fromstation").val().trim();
        var toStation = $("#tostation").val().trim();


        payload["arguments"].execute.inArguments = [
            { fromStation: fromStation, toStation: toStation }
        ];

        payload["metaData"].isConfigured = true;

        connection.trigger("updateActivity", payload);

    }

});