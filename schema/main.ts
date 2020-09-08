import * as codeGen from "js-ts-code-generator";
import * as definyCore from "definy-core";
import * as fs from "fs";
import * as prettier from "prettier";
import * as typePartMap from "./typePartMap";
import * as coreTypePartMap from "definy-core/schema/typePartMap";

const typeScriptCode = codeGen.generateCodeAsString(
  definyCore.generateTypeScriptCode(
    new Map([...coreTypePartMap.typePartMap, ...typePartMap.typePartMap])
  ),
  "TypeScript"
);

const typeScriptPath = "data.ts";
fs.promises
  .writeFile(
    typeScriptPath,
    prettier.format(typeScriptCode, { parser: "typescript" })
  )
  .then(() => {
    console.log("output TypeScript code!");
  });
