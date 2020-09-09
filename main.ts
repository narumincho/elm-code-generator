import * as data from "./data";

const indent = "    ";

export const elmTypeNameFromString = (
  typeName: string
): data.Maybe<data.ElmTypeName> => {
  if (/^[A-Z][a-zA-Z0-9]*$/u.test(typeName)) {
    return data.Maybe.Just(data.ElmTypeName.ElmTypeName(typeName));
  }
  return data.Maybe.Nothing();
};

export const codeToString = (elmCode: data.Code): string => {
  return (
    "module " +
    elmCode.moduleName +
    "exposing(" +
    elmCode.typeDeclarationList.map(typeDeclarationToExportName).join(", ") +
    ")" +
    "\n\n" +
    elmCode.typeDeclarationList.map(typeDeclarationToString).join("\n\n")
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
  "=\n" +
  indent +
  "{ " +
  typeAlias.fieldList.map(fieldToString).join("\n" + indent + ",") +
  "\n  }";

const fieldToString = (field: data.Field): string =>
  field.name + ": " + elmTypeToString(field.type);

const customTypeToString = (customType: data.CustomType): string =>
  "type " +
  customType.name.string +
  "\n" +
  indent +
  "= " +
  customType.variantList.map(variantToString).join("\n" + indent + "| ");

const variantToString = (variant: data.Variant): string =>
  variant.name + " " + variant.parameter.map(elmTypeToString).join(" ");

const elmTypeToString = (elmType: data.ElmType): string => {
  switch (elmType._) {
    case "LocalType":
      return elmType.elmTypeName.string;
    case "ImportedType":
      return (
        elmType.importedType.moduleName +
        "." +
        elmType.importedType.typeName.string
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
  }
};