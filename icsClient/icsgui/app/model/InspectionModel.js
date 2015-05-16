/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 15.05.15
 * Time: 07:29
 */
Ext.define('ICSGui.model.InspectionModel', {
    extend: 'Ext.data.Model',

    alias: 'model.inspection',
//    requires: [
//        'ICSGui.proxy.InspectionProxy'
//    ],

    config: {
        fields: [
            {name: 'inspectionIndex', type: 'int'},
            {name: 'inspectionTime', type: 'int'}
        ],
        idProperty: 'inspectionIndex'
//        proxy: 'inspection'
    }
});
