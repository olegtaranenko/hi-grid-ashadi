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
            html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
            width: 250,
            split: true,
            tbar: [{
                text: _.buttonText,
                handler: 'onClickButton'
            }],
            items: [{
                xtype: 'button',
                text: 'Show Message',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Message Box with custom icon',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            }]
        },{
            region: 'center',
            xtype:'maingrid',
            title:'Center Grid'
        }];

        me.items = items;
        me.callParent(arguments);
    }


});
