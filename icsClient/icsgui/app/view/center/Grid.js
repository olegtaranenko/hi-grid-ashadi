
Ext.define('ICSGui.view.center.Grid',{
   extend:'Ext.grid.Panel',
    xtype:'maingrid',
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            store:[],
            columns:[{text:'ID',width:40,dataIndex:'id'}]
        });
        me.callParent(arguments);
    }
});