/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('ICSGui.Application', {
    extend: 'Ext.app.Application',
    name: 'ICSGui',
    requires:[
        'Ext.layout.container.Border',
        'Ext.data.proxy.LocalStorage',
        'Ext.state.LocalStorageProvider',
        'ICSGui.plugin.HiGridRenderer',
        'Ext.form.Panel',
        'Ext.form.field.*'
    ],
    stores: [
        'ConfigStore'
    ],

    config: {
        socket: null
    },
    init:function(){
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
    },
    
    launch: function (config) {
        var me = this;
        var socket = io('localhost:5555', {
//            port: 5555,
//            reconnect: config.reconnect,
           'reconnection delay': 1000, //config['reconnection delay'],
//            'max reconnection attempts': config['max reconnection attemps'],
            'transports': ['websocket','flashsocket','htmlfile','xhr-multipart', 'xhr-polling']
        });

        if (socket) {
            me.setSocket(socket);
        } else {
            console.warn('something wrong')
        }
    }
});
