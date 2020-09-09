import * as data from "./data";

const sampleElmCode: data.Code = {
  moduleName: "Main",
  typeDeclarationList: [
    data.TypeDeclaration.CustomType({
      name: "Color",
      comment: "色",
      variantList: [
        { name: "Red", parameter: [] },
        { name: "Green", parameter: [] },
        { name: "Blue", parameter: [] },
      ],
    }),
  ],
};

const codeToString = (elmCode: data.Code): string => {
  return (
    "module " +
    elmCode.moduleName +
    "\n\n" +
    elmCode.typeDeclarationList.map(typeDeclarationToString).join("\n\n")
  );
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
  typeAlias.name +
  "=" +
  "{ " +
  typeAlias.fieldList.map(fieldToString).join("\n  ,") +
  "\n  }";

const fieldToString = (field: data.Field): string =>
  field.name + ": " + elmTypeToString(field.type);

const customTypeToString = (customType: data.CustomType): string =>
  "type " +
  customType.name +
  "\n  = " +
  customType.variantList.map(variantToString).join("\n  | ");

const variantToString = (variant: data.Variant): string =>
  variant.name + " " + variant.parameter.map(elmTypeToString).join(" ");

const elmTypeToString = (elmType: data.ElmType): string => {
  switch (elmType) {
    case "Int":
      return "Int";
  }
};

console.log(codeToString(sampleElmCode));
