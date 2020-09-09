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

export const CustomType = noParameterType(id.CustomType);

export const Variant = noParameterType(id.Variant);

export const ElmType = noParameterType(id.ElmType);
