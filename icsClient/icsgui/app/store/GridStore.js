Ext.define('ICSGui.store.GridStore', {
    extend: 'Ext.data.BufferedStore',
    requires: [
        'ICSGui.model.InspectionModel'
    ],

    config: {
        // overridden from Buffered store
        trailingBufferZone: 0,
        leadingBufferZone: 0,
        numFromEdge: 5,

        purgePageCount: 1,

        // my business var
        dirty: false

    },

    model: 'ICSGui.model.InspectionModel',

    remoteGroup: true,
    pageSize: 20,
    viewSize: 25,
    //defaultViewSize: 30,
    autoLoad: true,
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
