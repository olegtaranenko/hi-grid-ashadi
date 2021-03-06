/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 14.05.15
 * Time: 04:33
 */
Ext.define('ICSGui.controller.SocketController', {
    extend: 'Ext.app.Controller',

    onLaunch: function() {
        var me = this,
            socket = me.application.getSocket(),
            lastInspectionCt = me.lastInspectionCt(),
            intervalCt = Ext.ComponentQuery.query('app-main numberfield[name=refreshint]')[0],
            interval = intervalCt.getValue(),
            store = me.getGridStore();

        store.setThreshold(Number(interval));
        store.setSocket(socket);

        socket.on('serverConfiguration', function (data) {
            var emptyData = Ext.Object.isEmpty(data);

            if (emptyData) {
                data = me.gatherServerConfig();
                socket.emit('configuration', data);
            }

            if (lastInspectionCt) {
                var inspectionIndex = data.lastInspectionIndex || data.input_result;

                lastInspectionCt.setValue(inspectionIndex);
            }
        });

        socket.on('inspection', function(data) {
            if (lastInspectionCt) {
                var inspectionIndex = data.inspectionIndex;

                lastInspectionCt.setValue(inspectionIndex);
                store.setDirty(true);
            }
        })
    },


    gatherServerConfig: function() {
        var fields = Ext.ComponentQuery.query('app-main numberfield'),
            config = {};

        Ext.each(fields, function(field) {
            var ref = field.getReference();

            config[ref] = field.getValue();
        });
        console.log('Gathered configuration', config);

        return config;
    },


    lastInspectionCt: function() {
        return Ext.ComponentQuery.query('maingrid [name=lastInspection]')[0];
    },


    getGridStore: function() {
        var view = Ext.ComponentQuery.query('maingrid')[0];

        if (view) {
            return view.getStore();
        }
    }
});
