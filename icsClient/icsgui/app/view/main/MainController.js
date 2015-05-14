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
        control: {

        }
    },

    onLaunch: function(config) {
        debugger;
    },


    alias: 'controller.main',

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },


    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },


    onChangeConfig: function(combo, record){
        var data = record.data;
        this.lookupReference('input_fps').setValue(record.get('fps'));
        this.lookupReference('input_buffer').setValue(data.buffer);
        this.lookupReference('input_result').setValue(data.initialResults);
        this.lookupReference('input_refreshint').setValue(data.refreshint);
    },

    gatherServerConfig: function() {
        var fields = Ext.ComponentQuery.query('app-main numberfield'),
            config = {};

        Ext.each(fields, function(field) {
            var ref = field.getReference();

            config[ref] = field.getValue();
        });

        return config;
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
        var socket = ICSGui.app.getSocket();
        socket.emit('reset');
    }
});
