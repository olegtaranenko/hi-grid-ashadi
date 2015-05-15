/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 14.05.15
 * Time: 04:33
 */
Ext.define('ICSGui.controller.SocketController', {
    extend: 'Ext.app.Controller',

    config: {

    },

    onLaunch: function() {
        var me = this,
            socket = this.application.getSocket(),
            lastInspectionCt = this.lastInspectionCt();

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
    }
});
