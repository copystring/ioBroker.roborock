const Parser = require("binary-parser").Parser;

const hex = "200358020200080008000000e201e500aa02ad010300080032870100";
const buf = Buffer.from(hex, "hex");

const parser = new Parser()
    .endianess("little")
    .uint16("width")
    .uint16("height")
    .uint32("unknown1") // 02 00 08 00
    .uint32("unknown2") // 08 00 00 00
    .uint16("x1")
    .uint16("y1")
    .uint16("x2")
    .uint16("y2")
    .uint32("unknown3")
    .uint32("unknown4");

const result = parser.parse(buf);
console.log(result);
