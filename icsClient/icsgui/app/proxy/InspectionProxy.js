/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 16.05.15
 * Time: 19:38
 */
Ext.define('ICSGui.proxy.InspectionProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.inspection',

    config: {
        url: 'http://localhost:5555/results',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

/*
    readTopPage: function(options) {
        var me = this,
            operation = me.createOperation('read', options);

        me.read(operation);
    },
*/

    createOperation: function(operation, options) {
        var me = this,
            ret = me.callParent(arguments);

        return ret;
    },

    processResponse: function(success, operation, request, response) {
        var me = this,
            ret = me.callParent(arguments);

        return ret;
    }
});
