Ext.define('ICSGui.store.GridStore', {
    extend: 'Ext.data.BufferedStore',
    requires: [
        'ICSGui.model.InspectionModel',
        'ICSGui.proxy.InspectionProxy'
    ],

    config: {
        model: 'ICSGui.model.InspectionModel',

        proxy: 'inspection',
        // overridden from Buffered store
        trailingBufferZone: 0,
        leadingBufferZone: 0,
        numFromEdge: 5,

        purgePageCount: 1,

        // my business var
        dirty: false,
        socket: null

    },


    remoteGroup: true,
    pageSize: 20,
    viewSize: 25,
    //defaultViewSize: 30,
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true,

    updateDirty: function(dirty, old) {
        if (dirty) {
        }
    },

    updateSocket: function(socket) {
        var throttledUpdate = Ext.Function.createThrottled(function() {

        }, 500)
    }
});
