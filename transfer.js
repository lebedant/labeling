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
            url: Transfer.host + "/api/v1/register_participant.json",
            dataType: "json",
        });
        promise.done(function (response) {
            // save participant id
            localStorage.setItem("participantId", response.internal_id);
            console.info("Participant ID: " + response.internal_id);
            console.info('Successfull registration.');
        });
        promise.fail(function (xhr, status, error) {
            console.error('Error registration:' + xhr.responseJSON.message);
        });
        return promise;
    };

    Transfer.sendData = function (partToken, params) {
        // ajax request
        var promise = $.ajax({
            method: "POST",
            url: Transfer.host + "/api/v1/save_data.json",
            contentType: "application/json",
            data: JSON.stringify({
                part_id: partToken,
                variable_values: params,
                internal_id: localStorage.getItem("participantId")
            }),
            dataType: "json"
        });
        promise.done(function (response) {
            console.info('Successfull data transfer.');
        });
        promise.fail(function (xhr, status, error) {
            console.error('Error send data: ' + error + " - " + xhr.responseJSON.message);
        });
        return promise;
    };
    Transfer.host = 'https://experiments-tool.herokuapp.com';
    // Transfer.host = 'http://localhost:3030';
    return Transfer;
}());
