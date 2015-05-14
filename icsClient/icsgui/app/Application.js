/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('ICSGui.Application', {
    extend: 'Ext.app.Application',
    name: 'ICSGui',
    requires:[
      'Ext.layout.container.Border'
    ],
    stores: [

    ],

    config: {
        socket: null
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

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });

        if (socket) {
            me.setSocket(socket);
        } else {
            console.warn('something wrong')
        }
    }
});
