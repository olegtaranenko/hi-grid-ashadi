/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 16.05.15
 * Time: 08:01
 */
Ext.define('ICSGui.plugin.HiGridRenderer', {
    extend: 'Ext.grid.plugin.BufferedRenderer',

    trailingBufferZone: 0,
    leadingBufferZone: 0,
    numFromEdge: 0,

    init: function(config) {
        var me = this,
            ret = me.callParent(arguments);

        return ret;
    }
});