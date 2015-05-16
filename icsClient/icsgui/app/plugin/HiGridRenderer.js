/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 16.05.15
 * Time: 08:01
 */
Ext.define('ICSGui.plugin.HiGridRenderer', {
    extend: 'Ext.grid.plugin.BufferedRenderer',

//    trailingBufferZone: 1,
//    leadingBufferZone: 1,
//    numFromEdge: 0,
    variableRowHeight: false,

    init: function(config) {
        var me = this,
            ret = me.callParent(arguments);

        return ret;
    }
});