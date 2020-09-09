import * as data from "definy-core/source/data";
import * as id from "./typePartId";

const noParameterType = (typePartId: data.TypePartId): data.Type => ({
  typePartId,
  parameter: [],
});

export const Code = noParameterType(id.Code);

export const TypeDeclaration = noParameterType(id.TypeDeclaration);

export const TypeAlias = noParameterType(id.TypeAlias);

export const Field = noParameterType(id.Field);

export const FieldName = noParameterType(id.FieldName);

export const CustomType = noParameterType(id.CustomType);

export const CustomTypeExportLevel = noParameterType(id.CustomTypeExportLevel);

export const Variant = noParameterType(id.Variant);

export const VariantName = noParameterType(id.VariantName);

export const ElmType = noParameterType(id.ElmType);

export const ElmTypeName = noParameterType(id.ElmTypeName);

export const ImportedType = noParameterType(id.ImportedType);

export const FunctionType = noParameterType(id.FunctionType);

export const Tuple2 = noParameterType(id.Tuple2);

export const Tuple3 = noParameterType(id.Tuple3);
