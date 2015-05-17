Ext.define('ICSGui.store.InspectionsStore', {
    extend: 'Ext.data.BufferedStore',
    requires: [
        'ICSGui.model.InspectionModel',
        'ICSGui.overrides.PageMap',
        'ICSGui.proxy.InspectionProxy'
    ],

    config: {
        model: 'ICSGui.model.InspectionModel',

        proxy: 'inspection',
        // overridden from Buffered store
        trailingBufferZone: 0,
        leadingBufferZone: 0,
//        numFromEdge: 2,

        purgePageCount: 2,

        // my business var
        dirty: false,
        socket: null

    },


    remoteGroup: true,
    pageSize: 25,
//    viewSize: 25,
    //defaultViewSize: 30,
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true,

    updateViewSize: function(viewSize, old) {
        if (!old) {
            // one off setting
//            this.setPageSize(viewSize + 1);
        }
    },

    updateDirty: function(dirty, old) {
        var socket = this.getSocket();

        if (socket) {
            if (dirty) {
                socket.on('inspection', this.throttledUpdate);
            } else {
                socket.off('inspection', this.throttledUpdate);
            }
        }
    },

    updateSocket: function(socket) {
        var me = this;
        this.throttledUpdate = Ext.Function.createThrottled(function() {
            console.log('throttled update');
            me.readTopPage();
        }, 500);
    },

    readTopPage: function() {
        var me = this,
            topRecord = me.getAt(0),
            lastClientIndex = topRecord ? topRecord.get('inspectionIndex') : -1,
            proxy = me.getProxy(),
            options = {
                params: {
                    lastClientIndex: lastClientIndex
                },
                page: 1,
                start: 0,
                callback: function(records, operation, success) {
                    var pageMap = me.getData();

                    if (success) {
                        pageMap.appendRecordsToTop(records);
                        me.totalCount += records.length;
                        me.fireEvent('totalcountchange', me.totalCount);
                        me.fireEvent('datachanged', me);
                        me.fireEvent('refresh', me);
                    }
                }
            },
            operation = me.createOperation('read', options);

        proxy.read(operation);
    }
});
