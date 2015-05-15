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
        lastInspectionIndex: 0,
        delayRefresh: 1000,
        currentPageGrid: 0
    },

    alias: 'controller.main',

    init: function() {
        var me = this;

        me.deferredLoad = Ext.create('Ext.util.DelayedTask', me.refreshStore, me);
    },

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

    refreshStore: function() {
        var me = this,
            store = me.lookupReference('maingrid').getStore();

        me.setCurrentPageGrid(me.getCurrentPageGrid() + 1);
        store.setPageSize(me.getCurrentPageGrid() * 20);
        store.load();
        me.deferredLoad.delay(me.getDelayRefresh());
    },

    onServerRun: function(ct) {
        console.log('onServerRun');
        var me = this,
            socket = ICSGui.app.getSocket(),
            config = me.gatherServerConfig();

        socket.emit('start', config);
        me.deferredLoad.delay(0);
    },


    onServerStop: function(ct) {
        console.log('onServerStop');
        var socket = ICSGui.app.getSocket();
        socket.emit('stop');
        this.deferredLoad.cancel();
    },


    onServerReset: function(ct) {
        console.log('onServerReset');
        var socket = ICSGui.app.getSocket(),
            config = this.gatherServerConfig();

        socket.emit('reset', config);
    }
});
