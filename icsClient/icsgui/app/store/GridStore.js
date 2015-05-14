Ext.define('ICSGui.store.GridStore',{
    extend:'Ext.data.BufferedStore',
    fields:['inspectionIndex','inspectionTime','iterationDuration','inspectionDuration'],
    remoteGroup: true,
//    leadingBufferZone: 300,
    pageSize: 100,
    autoLoad:false,
    proxy:{
        url:'http://localhost:5555/results',
        type:'ajax',
        simpleSortMode: true,
        reader:{
            type:'json',
            rootProperty:'data',
            totalProperty:'total'
        }
    }
});