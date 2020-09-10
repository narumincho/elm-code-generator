import * as data from "./data";
import * as main from "./main";

export const Array = data.ElmType.ImportedType({
  moduleName: "Array",
  typeName: main.elmTypeNameFromStringOrThrow("Array"),
});

/** 基本の整数型 JSの出力なら -9007199254740991 ~ 9007199254740991 の範囲に対応している */
export const Int = data.ElmType.ImportedType({
  moduleName: "Basic",
  typeName: main.elmTypeNameFromStringOrThrow("Int"),
});

export const Float = data.ElmType.ImportedType({
  moduleName: "Basic",
  typeName: main.elmTypeNameFromStringOrThrow("Float"),
});

export const Order = data.ElmType.ImportedType({
  moduleName: "Basic",
  typeName: main.elmTypeNameFromStringOrThrow("Order"),
});

export const Bool = data.ElmType.ImportedType({
  moduleName: "Basic",
  typeName: main.elmTypeNameFromStringOrThrow("Bool"),
});

export const String = data.ElmType.ImportedType({
  moduleName: "String",
  typeName: main.elmTypeNameFromStringOrThrow("String"),
});
