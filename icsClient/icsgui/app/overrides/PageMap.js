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
        var me = this,
            map = me.map,
            top = map && map[1],
            fixMapIndex = false;

        if (top) {
            var cachedRecs = top.value;
            for (var index = records.length - 1; index >= 0; index--) {
                var addedRecord = records[index];

                cachedRecs.unshift(addedRecord);
                fixMapIndex = true;
            }
        } else {
            me.addPage(1, records);
        }

        if (fixMapIndex) {

        }
    },

    isTopPageCached: function() {
        var map = this.map,
            top = map && map[1];

        return top ? top.value.length : 0;
    },

    getPageFromRecordIndex: function(index) {
        var ret = 0,
            topCached = this.isTopPageCached();

        if (!topCached) {
            ret = this.callParent(arguments);
        } else {
            var correctedIndex = index - topCached + 1;
            if (correctedIndex >= 0) {
                ret = this.callParent([correctedIndex]);
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
        // Store's backing Collection now uses EXCLUSIVE endIndex
        // So store will always pass the endIndex+1
//        console.log('start: %s, end: %s', start, end)
        end--;

        if (!this.hasRange(start, end)) {
           Ext.Error.raise('PageMap asked for range which it does not have');
        }
        var me = this,
            pageSize = me.getPageSize(),
            startPageNumber = me.getPageFromRecordIndex(start),
            endPageNumber = me.getPageFromRecordIndex(end),
            topPageSize = startPageNumber === 1 ? me.map[1].value.length : 0,
            dataStart = (startPageNumber > 1) ? (startPageNumber - 1) * pageSize : 0,
            dataEnd = (endPageNumber > 1) ? endPageNumber * pageSize - 1 : topPageSize - 1,
            pageNumber = startPageNumber,
            result = [],
            sliceBegin, sliceEnd, doSlice;

        for (; pageNumber <= endPageNumber; pageNumber++) {

            // First and last pages will need slicing to cut into the actual wanted records
            if (pageNumber === startPageNumber) {
                sliceBegin = start - dataStart;
                doSlice = true;
            } else {
                sliceBegin = 0;
                doSlice = false;
            }
            if (pageNumber === endPageNumber) {
                sliceEnd = me.getPageSize(pageNumber) - (dataEnd - end);
                doSlice = true;
            }

            // First and last pages will need slicing
            if (doSlice) {
                Ext.Array.push(result, Ext.Array.slice(me.getPage(pageNumber), sliceBegin, sliceEnd));
            } else {
                Ext.Array.push(result, me.getPage(pageNumber));
            }
        }
        if (start != end) {
            console.log('startPage: %s, endPage: %s, result: ', startPageNumber, endPageNumber, result);
        }
        return result;
    },

    getPageSize: function(pageNumber) {
        if (pageNumber != 1) {
            return this.callParent();
        }
        return this.map[1].value.length;
    }
});
