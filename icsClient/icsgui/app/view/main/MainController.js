/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ICSGui.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    config: {
        lastInspectionIndex: 0
    },

    alias: 'controller.main',


    onChangeConfig: function(combo, record){
        var data = record.data;
        this.lookupReference('input_fps').setValue(record.get('fps'));
        this.lookupReference('input_buffer').setValue(data.buffer);
        this.lookupReference('input_result').setValue(data.initialResults);
        this.lookupReference('input_refreshint').setValue(data.refreshint);
    },


    gatherServerConfig: function() {
        var socketController = ICSGui.app.getController('ICSGui.controller.SocketController');

        return socketController.gatherServerConfig();
    },


    onServerRun: function(ct) {
        console.log('onServerRun');
        var socket = ICSGui.app.getSocket(),
            config = this.gatherServerConfig();

        socket.emit('start', config);
    },


    onServerStop: function(ct) {
        console.log('onServerStop');
        var socket = ICSGui.app.getSocket();
        socket.emit('stop');
    },


    onServerReset: function(ct) {
        console.log('onServerReset');
        var socket = ICSGui.app.getSocket(),
            config = this.gatherServerConfig();

        socket.emit('reset', config);
    }
});
