Ext.define('ICSGui.store.GridStore', {
    extend: 'Ext.data.BufferedStore',
    requires: [
        'ICSGui.model.InspectionModel'
    ],

    config: {
        dirty: false
    },

    model: 'ICSGui.model.InspectionModel',
    remoteGroup: true,
    pageSize: 20,
    viewSize: 41,
    defaultViewSize: 41,
    autoLoad: false,
    remoteSort: true,
    remoteFilter: true,
    proxy: {
        url: 'http://localhost:5555/results',
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
