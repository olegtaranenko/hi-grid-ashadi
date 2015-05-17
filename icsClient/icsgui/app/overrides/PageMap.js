/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 17.05.15
 * Time: 08:55
 */
Ext.define('ICSGui.overrides.PageMap', {
    override: 'Ext.data.PageMap',

    config: {
        firstPageSize: null
    },

    getRange: function(start, end) {
        console.log('overriden getRange', arguments);
        return this.callParent(arguments);
    }

});
