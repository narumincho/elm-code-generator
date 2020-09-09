import * as data from "./data";
import * as main from "./main";

/** 基本の整数型 JSの出力なら -9007199254740991 ~ 9007199254740991 の範囲に対応している */
export const Int = data.ElmType.ImportedType({
  moduleName: "Basic",
  typeName: main.elmTypeNameFromStringOrThrow("Int"),
});
