/**
 * Created by Ashadi on 5/14/2015.
 */

Ext.define('ICSGui.store.ConfigStore',{
    extend:'Ext.data.Store',
    fields:['name','fps','buffer','result','refreshint'],
    data:[
        {name:'High', fps:30, buffer:40, result:50, refreshint: 60},
        {name:'Medium', fps:20, buffer:30, result:40, refreshint: 50},
        {name:'Low', fps:10, buffer:20, result:30, refreshint: 40}
    ]
});
