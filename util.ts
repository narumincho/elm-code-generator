import * as data from "./data";
import * as main from "./main";

const importedType = (moduleName: string, typeName: string): data.ElmType =>
  data.ElmType.ImportedType({
    moduleName,
    typeName: main.elmTypeNameFromStringOrThrow(typeName),
  });

export const Array = importedType("Array", "Array");

/** 基本の整数型 JSの出力なら -9007199254740991 ~ 9007199254740991 の範囲に対応している */
export const Int = importedType("Basic", "Int");

export const Float = importedType("Basic", "Float");

export const Order = importedType("Basic", "Order");

export const Bool = importedType("Basic", "Bool");

export const String = importedType("String", "String");
