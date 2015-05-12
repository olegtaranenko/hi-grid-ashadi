
Ext.define('ICSGui.view.center.Grid',{
   extend:'Ext.grid.Panel',
    xtype:'maingrid',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            store: me.createStore(),
            columns:[
                {dataIndex:'inspectionIndex',text:'inspectionIndex',flex:1},
                {dataIndex:'inspectionTime',text:'inspectionTime',flex:1},
                {dataIndex:'iterationDuration',text:'iterationDuration',flex:1},
                {dataIndex:'inspectionDuration',text:'inspectionDuration',flex:1}
            ]
        });

        me.store.loadPage(1);
        me.callParent(arguments);
    },

    createStore:function(){
        var store = Ext.create('Ext.data.BufferedStore',{
            fields:['inspectionIndex','inspectionTime','iterationDuration','inspectionDuration'],
            remoteGroup: true,
            leadingBufferZone: 300,
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

        return store;
    }
});