Ext.define('ICSGui.store.GridStore',{
    extend:'Ext.data.Store',
    requires: [
        'ICSGui.model.InspectionModel'
    ],

    config: {
        dirty: false
    },

    model: 'ICSGui.model.InspectionModel',
    sorters: [{
        property: 'inspectionIndex',
        direction: 'DESC'
    }],
    remoteGroup: true,
    pageSize: 20,
    autoLoad:false,
    remoteSort: true,
    remoteFilter: true,
    proxy:{
        url:'http://localhost:5555/results',
        type:'ajax',
        reader:{
            type:'json',
            rootProperty:'data',
            totalProperty:'total'
        }
    }
});
