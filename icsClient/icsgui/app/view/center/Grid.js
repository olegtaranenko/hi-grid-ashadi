Ext.define('ICSGui.view.center.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'ICSGui.store.GridStore'
    ],

    xtype: 'maingrid',


    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            store: me.createStore(),
            columns: [
                {dataIndex: 'inspectionIndex', text: 'Inspection', flex: 1, sortable: false},
                {dataIndex: 'inspectionTimestamp', text: 'Time', flex: 1, sortable: false}
            ]
        });

        me.store.loadPage(1);
        me.callParent(arguments);
    },

    tbar: [
        {xtype: 'textfield', name: 'lastInspection', fieldLabel: 'Last Inspection'},
        {xtype: 'textfield', name: 'start', fieldLabel: 'Start', labelWidth: 30}
    ],

    createStore: function() {
        return Ext.create('ICSGui.store.GridStore');
    }

});
