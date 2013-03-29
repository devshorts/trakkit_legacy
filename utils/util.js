var collection = (function () {
    function collection() { }
    collection.isNullOrEmpty = function isNullOrEmpty(arr) {
        if(arr == null || arr.length == 0) {
            return true;
        }
        return false;
    };
    return collection;
})();
exports.collection = collection;
//@ sourceMappingURL=util.js.map
