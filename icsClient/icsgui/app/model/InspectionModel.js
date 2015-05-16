/**
 * Created by JetBrains WebStorm.
 * User: user1
 * Date: 15.05.15
 * Time: 07:29
 */
Ext.define('ICSGui.model.InspectionModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'inspectionIndex', type: 'int'},
            {name: 'inspectionTime', type: 'date'}
        ],
        idProperty: 'inspectionIndex'
    }
});
