/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
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

    onChangeFieldConfig:function(field){
        var val = field.getValue();
        if(val != null){
            var store = Ext.getStore('ConfigStore');
            var name = this.lookupReference('cconfig').getValue();
            var rec = store.findRecord('name',name);
            if(rec){
                rec.set(field.name, val);
                rec.commit();
                rec.save();
            }
        }
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
