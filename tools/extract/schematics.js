#!/usr/local/bin/node
import { spawn } from "child_process";
import { access, copyFile, readFile, writeFile } from "fs/promises";

/**
 * Runs system grep command
 *
 * @param {string} needle
 * @param {string} file
 *
 * @returns {Promise<string>}
 */
async function grepWithShell(needle, file) {
  return new Promise((resolve) => {
    let res = "";
    const child = spawn("rg", ["-i", needle, file]);
    child.stdout.on("data", function (buffer) {
      res += buffer.toString();
    });
    child.stdout.on("end", function () {
      resolve(res);
    });
  });
}

/**
 * Parses grep output and returns an array of files
 *
 * @returns {Promise<string[]>}
 */
async function getAll() {
  return (await grepWithShell(`"type": "schematic"`, "FSD"))
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(":")[0]);
}

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

async function readJSON(file) {
  return JSON.parse((await readFile(file, "utf-8")).toString());
}

async function main() {
  const all = await getAll();
  const result = new Map();

  for (const file of all) {
    const json = await readJSON(file);
    const schematics = json.filter((x) => x.Type === "Schematic");

    if (!schematics) {
      console.error("No schematic found in", file);
      continue;
    }

    for (const schematic of schematics) {
      // get dwarf name
      const dwarf = schematic.Properties.UsedByCharacter.ObjectName.split(
        " "
      )[1].replace("ID", "");

      const ID = schematic.Properties.SaveGameID;
      const infoFile = schematic.Properties.Item.ObjectPath;
      const index = infoFile.split(".")[1];
      const weapon = schematic?.Outer?.split("_")[1] ?? "SMG";
      if (!weapon) {
        console.error("No weapon found in", file);
      }

      if (infoFile.includes("Overclock") || infoFile.includes("OCs")) {
        const bank = json[index];
        if (bank.Type === "OverclockShematicItem") {
          const oc = bank.Properties.Overclock.ObjectPath.split(".")[0];
          const index = bank.Properties.Overclock.ObjectPath.split(".")[1];
          const ocjson = await readJSON(`${oc}.json`);

          let name = ocjson?.[index]?.Properties?.Name?.SourceString;
          //const class = ocjson?.[0]?.Properties?.Category?.ObjectPath;
          let description =
            ocjson?.[index]?.Properties?.Description?.SourceString;
          if (!name) {
            const table =
              ocjson?.[index]?.Properties?.Name?.TableId.split(".")[0];
            const key = ocjson?.[index]?.Properties?.Name?.Key;
            const tablejson = await readJSON(`FSD/${table}.json`);
            name = tablejson?.[0]?.StringTable?.KeysToMetaData?.[key];
            if (!name) {
              console.error("No name found for", oc);
              continue;
            }

            if (!description) {
              const key = ocjson?.[index]?.Properties?.Description?.Key;
              description = tablejson?.[0]?.StringTable?.KeysToMetaData?.[key];
            }
          }
          let type =
            ocjson?.[index]?.Properties?.SchematicCategory?.ObjectName?.split(
              "_"
            );
          type = type[type.length - 1];

          const categoryPath =
            ocjson?.[index]?.Properties?.Category?.ObjectPath.split(".")[0];

          const categoryJson = JSON.parse(
            (await readFile(`${categoryPath}.json`)).toString()
          );

          const category =
            categoryJson?.[0]?.Properties?.CategoryName?.SourceString;

          const icon =
            categoryJson?.[0]?.Properties?.CategoryIcon?.ObjectPath.split(
              "."
            )[0];

          const asset = icon.split("/")[icon.split("/").length - 1];

          access(`public/assets/icons/${asset}.png`).catch(async () => {
            console.error("Missing icon", asset);
            await copyFile(`./${icon}.png`, `public/assets/icons/${asset}.png`);
          });

          result.set(guidToHex(ID), {
            name,
            dwarf,
            description,
            type,
            category,
            weapon,
            asset: `/assets/icons/${asset}.png`,
          });
          //console.log({ dwarf, ID, name, current });
        } else {
          console.error("Unknown type", bank.Type);
          continue;
        }
      } else {
        // Unsupported
        console.error("Unknown info file", infoFile);
        continue;
      }
    }
  }
  const final = {};
  [...result].forEach(([key, value]) => {
    const d = value.dwarf.toLowerCase();
    final[d] = final[d] || [];
    delete value.dwarf;
    final[d].push({ ...value, ID: key });
  });
  await writeFile("data/schematics.json", JSON.stringify(final, null, 2));
  console.log("Done!");
  console.log("Wrote data/schematics.json", `with ${result.size} schematics`);
}

main();
