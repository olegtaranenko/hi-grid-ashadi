Ext.define('ICSGui.view.center.Grid',{
   extend:'Ext.grid.Panel',
    xtype:'maingrid',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            store: me.createStore(),
            columns:[
                {dataIndex:'inspectionIndex',text:'inspectionIndex',flex:1,sortable:false},
                {dataIndex:'inspectionTime',text:'inspectionTime',flex:1,sortable:false}
            ]
        });

        me.store.loadPage(1);
        me.callParent(arguments);
    },

    tbar:[
        {xtype:'textfield',name:'lastInspection',fieldLabel:'Last Inspection'},
        {xtype:'textfield',name:'start',fieldLabel:'Start',labelWidth:30}
    ],

    createStore:function(){
        var store = Ext.create('Ext.data.BufferedStore',{
            fields:['inspectionIndex','inspectionTime'],
            remoteGroup: true,
//            leadingBufferZone: 300,
            pageSize: 100,
            autoLoad:false,
            sorters: [{
                property:'inspectionIndex',
                direction:'DESC'
            }],
            proxy:{
                url:'http://localhost:5555/results',
                type:'ajax',
                //simpleSortMode: true,
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