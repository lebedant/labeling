"use strict";
var Transfer = (function () {
    function Transfer() {
    }

    Transfer.registerParticipant = function () {
        // do the registration
        // ajax request
        var promise = $.ajax({
            context: this,
            method: "POST",
            url: Transfer.host + "/api/v1/participants.json",
            dataType: "json",
        });
        promise.done(function (response) {
            // save participant id
            localStorage.setItem("participantId", response.internal_id);
            console.info('Successful registration.');
        });
        promise.fail(function (xhr, status, error) {
            console.error('Error of registration:' + xhr.responseJSON.message);
        });
        return promise;
    };

    Transfer.sendData = function (partToken, params) {
        // ajax request
        var promise = $.ajax({
            method: "POST",
            url: Transfer.host + "/api/v1/experiments/parts/" + partToken + "/data.json",
            contentType: "application/json",
            data: JSON.stringify({
                variable_values: params,
                internal_id: localStorage.getItem("participantId")
            }),
            dataType: "json"
        });
        promise.done(function (response) {
            console.info('Successful data transfer.');
        });
        promise.fail(function (xhr, status, error) {
            console.error('Error of data sending: ' + error + " - " + xhr.responseJSON.message);
        });
        return promise;
    };
    Transfer.host = 'https://experiments-tool.herokuapp.com';
    return Transfer;
}());
