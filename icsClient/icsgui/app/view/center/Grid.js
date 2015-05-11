
Ext.define('ICSGui.view.center.Grid',{
   extend:'Ext.grid.Panel',
    xtype:'maingrid',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            store:Ext.create('ICSGui.store.GridStore'),
            columns:[
                {dataIndex:'inspectionIndex',text:'inspectionIndex',flex:1},
                {dataIndex:'inspectionTime',text:'inspectionTime',flex:1},
                {dataIndex:'iterationDuration',text:'iterationDuration',flex:1},
                {dataIndex:'inspectionDuration',text:'inspectionDuration',flex:1}
            ]
        });

        me.store.loadPage(1);
        me.callParent(arguments);
    }
});