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
        'ICSGui.view.center.Grid'
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
        var items = [{
            xtype: 'panel',
            //ui: 'highlight',
            //bodyCls: 'content-panel-body',
            bind:{
                title:'{name}'
            },
            region: 'west',
            width: 250,
            split: true,
            layout:'fit',
            items:[
                {
                    xtype:'form',
                    bodyPadding:'10',
                    flex:1,
                    layout:'anchor',
                    defaults:{
                      anchor:'100%',
                        labelSeparator:''
                    },
                    items:[
                        {
                            xtype:'combo',
                            store:[
                                ['High','High']
                            ],
                            labelAlign:'top',
                            fieldLabel:'Saved Configuration'
                        },{
                            xtype:'numberfield',
                            name:'fps',
                            hideTrigger:true,
                            fieldLabel:'FPS',
                            labelWidth:140
                        },{
                            xtype:'numberfield',
                            name:'buffer',
                            hideTrigger:true,
                            fieldLabel:'Buffer Size',
                            labelWidth:140
                        },{
                            xtype:'numberfield',
                            name:'result',
                            hideTrigger:true,
                            fieldLabel:'Current result',
                            labelWidth:140
                        },{
                            xtype:'numberfield',
                            name:'refreshint',
                            hideTrigger:true,
                            fieldLabel:'Refresh Interval',
                            labelWidth:140
                        }

                    ],
                    bbar:[
                        {text:'Run'},
                        {text:'Pause'},
                        {text:'Refresh'}
                    ]
                }
            ]
        },{
            region: 'center',
            xtype:'maingrid',
            title:'Center Grid'
        }];

        me.items = items;
        me.callParent(arguments);
    }


});
