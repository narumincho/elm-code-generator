import * as data from "./data";
import { strict } from "assert";

const reservedWord = new Set([
  "if",
  "then",
  "else",
  "case",
  "of",
  "let",
  "in",
  "type",
  "module",
  "where",
  "import",
  "port",
  "exposing",
  "as",
  "alias",
]);

const indent = "    ";

export const fieldNameFromString = (
  fieldName: string
): data.Maybe<data.FieldName> => {
  if (/^[a-z][a-zA-Z0-9_]*/u.test(fieldName) && !reservedWord.has(fieldName)) {
    return data.Maybe.Just(data.FieldName.FieldName(fieldName));
  }
  return data.Maybe.Nothing();
};

export const fieldNameFromStringOrThrow = (
  fieldName: string
): data.FieldName => {
  const result = fieldNameFromString(fieldName);
  switch (result._) {
    case "Just":
      return result.value;
    case "Nothing":
      throw new Error("invalid field name = " + fieldName);
  }
};

export const variantNameFormString = (
  variantName: string
): data.Maybe<data.VariantName> => {
  if (
    /^[A-Z][a-zA-Z0-9_]*/u.test(variantName) &&
    !reservedWord.has(variantName)
  ) {
    return data.Maybe.Just(data.VariantName.VariantName(variantName));
  }
  return data.Maybe.Nothing();
};

/**
 * @throws バリアント名にできない名前だった場合
 */
export const variantNameFormStringOrThrow = (
  variantName: string
): data.VariantName => {
  const result = variantNameFormString(variantName);
  switch (result._) {
    case "Just":
      return result.value;
    case "Nothing":
      throw new Error("invalid variant name = " + variantName);
  }
};

export const elmTypeNameFromString = (
  typeName: string
): data.Maybe<data.ElmTypeName> => {
  if (/^[A-Z][a-zA-Z0-9_]*$/u.test(typeName) && !reservedWord.has(typeName)) {
    return data.Maybe.Just(data.ElmTypeName.ElmTypeName(typeName));
  }
  return data.Maybe.Nothing();
};

/**
 * @throws 型名にできない名前だった場合
 */
export const elmTypeNameFromStringOrThrow = (
  typeName: string
): data.ElmTypeName => {
  const result = elmTypeNameFromString(typeName);
  switch (result._) {
    case "Just":
      return result.value;
    case "Nothing":
      throw new Error("invalid elm type name = " + typeName);
  }
};

export const codeToString = (elmCode: data.Code): string => {
  return (
    "module " +
    elmCode.moduleName +
    " exposing (" +
    elmCode.typeDeclarationList.map(typeDeclarationToExportName).join(", ") +
    ")" +
    "\n\n" +
    elmCode.typeDeclarationList.map(typeDeclarationToString).join("\n\n") +
    "\n"
  );
};

const typeDeclarationToExportName = (
  typeDeclaration: data.TypeDeclaration
): string => {
  switch (typeDeclaration._) {
    case "CustomType":
      return customTypeToExportName(typeDeclaration.customType);
    case "TypeAlias":
      if (typeDeclaration.typeAlias.export) {
        return typeDeclaration.typeAlias.name.string;
      }
      return "";
  }
};

const customTypeToExportName = (customType: data.CustomType): string => {
  switch (customType.export) {
    case "NoExport":
      return "";
    case "ExportTypeOnly":
      return customType.name.string;
    case "ExportTypeAndVariant":
      return customType.name.string + "(..)";
  }
};

const typeDeclarationToString = (
  typeDeclaration: data.TypeDeclaration
): string => {
  switch (typeDeclaration._) {
    case "TypeAlias":
      return typeAliasToString(typeDeclaration.typeAlias);
    case "CustomType":
      return customTypeToString(typeDeclaration.customType);
  }
};

const typeAliasToString = (typeAlias: data.TypeAlias): string =>
  "type alias " +
  typeAlias.name.string +
  " =\n" +
  indent +
  elmTypeToString(typeAlias.type);

const fieldToString = (field: data.Field): string =>
  field.name.string + " : " + elmTypeToString(field.type);

const customTypeToString = (customType: data.CustomType): string =>
  "type " +
  customType.name.string +
  "\n" +
  indent +
  "= " +
  customType.variantList.map(variantToString).join("\n" + indent + "| ");

const variantToString = (variant: data.Variant): string =>
  variant.name.string +
  (variant.parameter.length === 0
    ? ""
    : " " + variant.parameter.map(elmTypeToString).join(" "));

const elmTypeToString = (elmType: data.ElmType): string => {
  switch (elmType._) {
    case "LocalType":
      if (elmType.localType.parameter.length === 0) {
        return elmType.localType.typeName.string;
      }
      return (
        "(" +
        elmType.localType.typeName.string +
        " " +
        elmType.localType.parameter.map(elmTypeToString).join(" ") +
        ")"
      );
    case "ImportedType":
      if (elmType.importedType.parameter.length === 0) {
        return (
          elmType.importedType.moduleName +
          "." +
          elmType.importedType.typeName.string
        );
      }
      return (
        "(" +
        elmType.importedType.moduleName +
        "." +
        elmType.importedType.typeName.string +
        " " +
        elmType.importedType.parameter.map(elmTypeToString).join(" ") +
        ")"
      );
    case "Function":
      return (
        "(" +
        elmTypeToString(elmType.functionType.input) +
        " -> " +
        elmTypeToString(elmType.functionType.output) +
        ")"
      );
    case "Tuple0":
      return "()";
    case "Tuple2":
      return (
        "(" +
        elmTypeToString(elmType.tuple2.first) +
        ", " +
        elmTypeToString(elmType.tuple2.second) +
        ")"
      );
    case "Tuple3":
      return (
        "(" +
        elmTypeToString(elmType.tuple3.first) +
        ", " +
        elmTypeToString(elmType.tuple3.second) +
        ", " +
        elmTypeToString(elmType.tuple3.third) +
        ")"
      );
    case "Record":
      return (
        "{ " +
        elmType.fieldList.map((e): string => fieldToString(e)).join(", ") +
        " }"
      );
  }
};
