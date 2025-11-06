var documents = require("../documents");
var Result = require("../results").Result;

exports.createHeaderReader = createReader.bind(this, documents.Header);
exports.createFooterReader = createReader.bind(this, documents.Footer);

function createReader(extremity, bodyReader) {
    function readExtremityXml(element) {
        var result = readElement(element, extremity);
        return Array.isArray(result) ? Result.combine(result) : Result.combine([result]);
    }

    function readElement(element, extremity) {
        return bodyReader.readXmlElements(element.children)
            .map(function(children) {
                return extremity(children);
            });
    }

    return readExtremityXml;
}
