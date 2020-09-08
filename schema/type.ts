import * as data from "definy-core/source/data";
import * as id from "./typePartId";

const noParameterType = (typePartId: data.TypePartId): data.Type => ({
  typePartId,
  parameter: [],
});

export const ElmCode = noParameterType(id.ElmCode);
