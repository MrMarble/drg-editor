#!/usr/local/bin/node

/**
 * Script to convert UE4 GUIDs (int32-int32-int32-int32 as hex)
 * to the hex string (32 hex digits) and back.
 */

/**
 * Converts a GUID of the form 7D4FBC22-433ED107-BD81CABF-AFB1149C
 * to a hex string 22bc4f7d07d13e43bfca81bd9c14b1af
 *
 * @param {string} guid
 * @returns {string}
 */
const guidToHex = (guid) =>
  guid
    .split("-")
    .map((segment) => parseInt(segment, 16))
    .map((segment) => {
      const view = new DataView(new ArrayBuffer(4));
      view.setUint32(0, segment, true);
      return new Uint8Array(view.buffer);
    })
    .map((segment) =>
      Array.from(segment)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
    )
    .join("");

/**
 * Converts a hex string of the form 22bc4f7d07d13e43bfca81bd9c14b1af
 * to a Guid 7D4FBC22-433ED107-BD81CABF-AFB1149C
 *
 * @param {string} hex
 * @returns {string|undefined}
 */
const hexToGuid = (hex) =>
  hex
    .match(/.{8}/g)
    ?.map((segment) =>
      parseInt(segment.match(/.{2}/g)?.reverse()?.join("") ?? "", 16)
    )
    ?.map((segment) => segment.toString(16).toUpperCase())
    ?.join("-");

function main(args) {
  const guid = parseArgs(args);

  if (guid.includes("-")) {
    console.log(guidToHex(guid));
  } else {
    console.log(hexToGuid(guid));
  }
}

/**
 *
 * @param {string[]} args
 * @returns string
 */
function parseArgs(args) {
  if (args.length !== 3) {
    console.error("Usage: guid.js <guid>");
  }
  return args[2];
}

// eslint-disable-next-line no-undef
main(process.argv);
