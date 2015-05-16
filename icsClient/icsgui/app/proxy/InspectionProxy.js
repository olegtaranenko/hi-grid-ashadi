/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 16.05.15
 * Time: 19:38
 */
Ext.define('ICSGui.proxy.InspectionProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.inspection',

    config: {
        url: 'http://localhost:5555/results',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});