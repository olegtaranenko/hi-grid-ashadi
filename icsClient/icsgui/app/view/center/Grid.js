Ext.define('ICSGui.view.center.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'ICSGui.store.GridStore'
    ],

    xtype: 'maingrid',

    bufferedRenderer: Ext.create('ICSGui.plugin.HiGridRenderer', {

    }),

    viewConfig: {
        loadMask: false
    },

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            store: me.createStore(),
            columns: [
                {dataIndex: 'inspectionIndex', text: 'Inspection', flex: 1, sortable: false},
                {dataIndex: 'inspectionTime', text: 'Time', flex: 1, sortable: false,
                    renderer: function(v) {
                        var dt = new Date(v);
                        return Ext.Date.format(dt, 'Y-m-d H:i:s.u');
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    tbar: [
        {xtype: 'textfield', name: 'lastInspection', fieldLabel: 'Last Inspection'},
        {xtype: 'textfield', name: 'start', fieldLabel: 'Start', labelWidth: 30}
    ],

    createStore: function() {
        return Ext.create('ICSGui.store.GridStore');
    },


    beforeRender: function() {
        var me = this;
        me.addPlugin(me.bufferedRenderer);
    }

});
