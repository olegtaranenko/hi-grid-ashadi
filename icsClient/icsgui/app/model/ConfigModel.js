/**
 * Created by Ashadi on 5/16/2015.
 */
Ext.define('ICSGui.model.ConfigModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'name', type:'string'},
        {name:'fps', type:'int'},
        {name:'buffer', type:'int'},
        {name:'initialResults', type:'int'},
        {name:'refreshint', type:'int'}
    ],
    proxy: {
        type: 'localstorage',
        id  : 'config-store'
    }
});
