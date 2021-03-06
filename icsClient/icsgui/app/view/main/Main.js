/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ICSGui.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.layout.container.Border',
        'ICSGui.global.Constants',
        'ICSGui.view.main.MainController',
        'ICSGui.view.main.MainModel',
        'ICSGui.view.center.InspectionsGrid'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },


    layout: {
        type: 'border'
    },


    initComponent: function() {
        var me = this;

        var combo_store = Ext.getStore('ConfigStore');
        combo_store.reload();
        if(!combo_store.data.length){
            combo_store.loadData(combo_store.configData,false);
            combo_store.sync();
        }

        var items = [{
            xtype: 'panel',
            //ui: 'highlight',
            //bodyCls: 'content-panel-body',
            bind: {
                title: '{name}'
            },
            region: 'west',
            width: 250,
            split: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyPadding: '10',
                flex: 1,
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'combo',
                    name: 'name',
                    reference:'cconfig',
                    store: combo_store,
                    valueField: 'name',
                    displayField: 'name',
                    stateful: true,
                    stateId: 'cofig_name',
                    queryMode:'local',
                    labelAlign: 'top',
                    fieldLabel: 'Saved Configuration',
                    forceSelection: true,
                    listeners: {
                        select: 'onChangeConfig'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'fps',
                    reference: 'input_fps',
                    stateful: true,
                    stateId: 'input_fps',
                    hideTrigger: true,
                    fieldLabel: 'FPS',
                    labelWidth: 140,
                    enableKeyEvents:true,
                    listeners:{
                        keyup:'onChangeFieldConfig'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'buffer',
                    reference: 'input_buffer',
                    stateful: true,
                    stateId: 'input_buffer',
                    hideTrigger: true,
                    fieldLabel: 'Buffer Size',
                    labelWidth: 140,
                    enableKeyEvents:true,
                    listeners:{
                        keyup:'onChangeFieldConfig'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'initialResults',
                    reference: 'input_result',
                    stateful: true,
                    stateId: 'input_result',
                    hideTrigger: true,
                    fieldLabel: 'Initial Results',
                    labelWidth: 140,
                    enableKeyEvents:true,
                    listeners:{
                        keyup:'onChangeFieldConfig'
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'refreshint',
                    reference: 'input_refreshint',
                    stateful: true,
                    stateId: 'input_refreshint',
                    hideTrigger: true,
                    fieldLabel: 'Refresh Interval',
                    labelWidth: 140,
                    enableKeyEvents:true,
                    listeners:{
                        keyup:'onChangeFieldConfig'
                    }
                }],
                bbar: [
                    {
                        text: 'Run',
                        handler: 'onServerRun'
                    },
                    {
                        text: 'Pause',
                        handler: 'onServerStop'
                    },
                    {
                        text: 'Push',
                        handler: 'onServerPushOneRecord'
                    }
                ]
            }]
        }, {
            region: 'center',
            title :'Center Grid',
            layout:'fit',
            items:{xtype:'maingrid'}
        }];

        me.items = items;
        me.callParent(arguments);
    }
});
