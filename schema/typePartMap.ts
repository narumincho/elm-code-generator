import * as id from "./typePartId";
import * as type from "./type";
import * as data from "definy-core/source/data";
import * as coreType from "definy-core/schema/type";

const elmCodeGeneratorProjectId = "a22746381a293cdace3777f1dfd77772" as data.ProjectId;
const elmCodeGeneratorCommitId = "e50182a0a5da1e531c343a5f2bd75c0c" as data.CommitId;

const t = (
  name: string,
  description: string,
  body: data.TypePartBody
): data.TypePart => ({
  name,
  description,
  projectId: elmCodeGeneratorProjectId,
  createCommitId: elmCodeGeneratorCommitId,
  attribute: data.Maybe.Nothing(),
  typeParameterList: [],
  body,
});

export const typePartMap: ReadonlyMap<data.TypePartId, data.TypePart> = new Map<
  data.TypePartId,
  data.TypePart
>([
  [
    id.ElmCode,
    t(
      "ElmCode",
      "Elmのコードを表現するもの",
      data.TypePartBody.Product([
        {
          name: "moduleName",
          description: "モジュール名",
          type: coreType.String,
        },
      ])
    ),
  ],
]);
