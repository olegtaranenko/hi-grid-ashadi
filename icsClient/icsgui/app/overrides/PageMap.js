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

    appendRecordsToTop: function(records) {
        var map = this.map,
            top = map && map[1];

        if (top) {
            var cachedRecs = top.value;
            for (var index = cachedRecs.length - 1; index >= 0; index--) {
                var addedRecord = cachedRecs[index];
                cachedRecs.unshift(addedRecord);
            }
        }
    },

    isTopPageCached: function() {
        var map = this.map,
            top = map && map[1];

        return top ? top.value.length : 0;
    },

    getPageFromRecordIndex: function(index) {
        var ret = this.callParent(arguments),
            topCached = this.isTopPageCached();

        if (!topCached) {
            ret = this.callParent(arguments);
        } else {
            var correctedIndex = index - topCached;
            if (correctedIndex > 0) {
                ret = this.callParent([correctedIndex]) + 1;
            } else {
                ret = this.callParent(arguments);
            }

        }
//         console.log('overriden getPageFromRecordIndex(%s), ret: %s', index, ret);
        return ret;
    },

    getCount: function() {
        var pages = this.length,
            topCached = this.isTopPageCached(),
//            logPages = pages,
            ret = 0;

        var msg = 'pages: %s';
        var first = this.first;
        var last = this.last;
        var params = [pages];
        
        if (first) {
            msg += ', first: %s';
            params.push(first.key);
        }
        if (last) {
            msg += ', last: %s';
            params.push(last.key);
        }

        if (topCached) {
            ret += this.map[1].value.length;
            pages--;
        }

        if (pages > 0) {
            if (last !== this.map[1]) {
                ret += this.last.value.length;
                pages--;
            }
        }

        if (pages > 0) {
            ret += pages * this.getPageSize();
        }

        msg += ', getCount(): %s';
        params.push(ret);
        if (topCached) {
            msg += ', topPage: %s';
            params.push(this.map[1].value.length);
        }
        params.unshift(msg);
        console.log.apply(console, params);
        return ret;
    },

    getRange: function(start, end) {
//         console.log('overriden getRange', arguments);
        return this.callParent(arguments);
    }
});
