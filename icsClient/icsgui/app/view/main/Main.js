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
            ui: 'highlight',
            bodyCls: 'content-panel-body',
            bind: {
                title: '{name}'
            },
            region: 'west',
            width: 250,
            split: true
        },{
            region: 'center',
            xtype:'maingrid',
            title:'Center Grid'
        }];

        me.items = items;
        me.callParent(arguments);
    }


});
