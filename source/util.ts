import * as data from "./data";
import * as main from "./main";

const importedType = (
  moduleName: string,
  typeName: string,
  parameter: ReadonlyArray<data.ElmType>
): data.ElmType =>
  data.ElmType.ImportedType({
    moduleName,
    typeName: main.elmTypeNameFromStringOrThrow(typeName),
    parameter,
  });

export const Array = (elementType: data.ElmType): data.ElmType =>
  importedType("Array", "Array", [elementType]);

/** 基本の整数型 JSの出力なら -9007199254740991 ~ 9007199254740991 の範囲に対応している */
export const Int = importedType("Basics", "Int", []);

export const Float = importedType("Basics", "Float", []);

export const Order = importedType("Basics", "Order", []);

export const Bool = importedType("Basics", "Bool", []);

export const Never = importedType("Basics", "Never", []);

export const String = importedType("String", "String", []);

export const Char = importedType("Char", "Char", []);

/** https://package.elm-lang.org/packages/elm/core/latest/Maybe#Maybe */
export const Maybe = (a: data.ElmType): data.ElmType =>
  importedType("Maybe", "Maybe", [a]);

/** https://package.elm-lang.org/packages/elm/core/latest/Result#Result */
export const Result = (
  error: data.ElmType,
  value: data.ElmType
): data.ElmType => importedType("Result", "Result", [error, value]);
