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
        function msToTime(duration) {
            var milliseconds = parseInt((duration%1000)/100)
                , seconds = parseInt((duration/1000)%60)
                , minutes = parseInt((duration/(1000*60))%60)
                , hours = parseInt((duration/(1000*60*60))%24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }

        Ext.apply(me, {
            store: me.createStore(),
            columns: [
                {dataIndex: 'inspectionIndex', text: 'Inspection', flex: 1, sortable: false},
                {dataIndex: 'inspectionTime', text: 'Time', flex: 1, sortable: false,
                    renderer:function(v){
                        return msToTime(v);
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
