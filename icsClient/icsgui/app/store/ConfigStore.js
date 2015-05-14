/**
 * Created by Ashadi on 5/14/2015.
 */

Ext.define('ICSGui.store.ConfigStore',{
    extend:'Ext.data.Store',
    fields:['name','fps','buffer','initialResults','refreshint'],
    data:[
        {name:'High', fps:30, buffer:1000, initialResults:150, refreshint: 60},
        {name:'Medium', fps:5, buffer:30000, initialResults:4000, refreshint: 50},
        {name:'Low', fps:1, buffer:200, initialResults:500, refreshint: 40}
    ]
});
