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

        var lastInspectionCt = Ext.ComponentQuery.query('maingrid [name=lastInspection]')[0];
        if (lastInspectionCt) {
            var socket = this.application.getSocket();
            socket.on('inspection', function(data) {
                var inspectionIndex = data.inspectionIndex;

                lastInspectionCt.setValue(inspectionIndex);
            })
        }
    }
});
