/**
 * Created by Ashadi on 5/14/2015.
 */

Ext.define('ICSGui.store.ConfigStore',{
    extend:'Ext.data.Store',
    requires:[
        'ICSGui.model.ConfigModel'
    ],
    model:'ICSGui.model.ConfigModel',
    configData:[
        {name:'High', fps:30, buffer:10000, initialResults:2000, refreshint: 100},
        {name:'Medium', fps:5, buffer:3000, initialResults:0, refreshint: 500},
        {name:'Low', fps:2, buffer:500, initialResults:0, refreshint: 1000}
    ]
});