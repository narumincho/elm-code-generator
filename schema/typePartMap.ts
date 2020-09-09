import * as coreType from "definy-core/schema/type";
import * as data from "definy-core/source/data";
import * as id from "./typePartId";
import * as type from "./type";

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
    id.Code,
    t(
      "Code",
      "Elmのコードを表現するもの",
      data.TypePartBody.Product([
        {
          name: "moduleName",
          description: "モジュール名",
          type: coreType.String,
        },
        {
          name: "typeDeclarationList",
          description: "型定義",
          type: coreType.List(type.TypeDeclaration),
        },
      ])
    ),
  ],
  [
    id.TypeDeclaration,
    t(
      "TypeDeclaration",
      "Elmの型定義",
      data.TypePartBody.Sum([
        {
          name: "TypeAlias",
          description: "型エイリアス. レコード型に名前を付ける",
          parameter: data.Maybe.Just(type.TypeAlias),
        },
        {
          name: "CustomType",
          description: "カスタム型. 代数的データ型",
          parameter: data.Maybe.Just(type.CustomType),
        },
      ])
    ),
  ],
  [
    id.TypeAlias,
    t(
      "TypeAlias",
      "型エイリアス. レコード型に名前を付け, その名前の関数を作成する",
      data.TypePartBody.Product([
        {
          name: "name",
          description: "型エイリアス名",
          type: coreType.String,
        },
        {
          name: "comment",
          description: "コメント",
          type: coreType.String,
        },
        {
          name: "fieldList",
          description: "フィードのリスト",
          type: coreType.List(type.Field),
        },
      ])
    ),
  ],
  [
    id.Field,
    t(
      "Field",
      "フィールド",
      data.TypePartBody.Product([
        {
          name: "name",
          description: "フィールド名",
          type: coreType.String,
        },
        {
          name: "type",
          description: "型",
          type: type.ElmType,
        },
      ])
    ),
  ],
  [
    id.CustomType,
    t(
      "CustomType",
      "カスタム型. 代数的データ型",
      data.TypePartBody.Product([
        { name: "name", description: "カスタム型名", type: coreType.String },
        {
          name: "comment",
          description: "コメント",
          type: coreType.String,
        },
        {
          name: "variantList",
          description: "バリアントのリスト. 値コンストラクタ. タグ",
          type: coreType.List(type.Variant),
        },
      ])
    ),
  ],
  [
    id.Variant,
    t(
      "Variant",
      "バリアント. 値コンストラクタ. タグ",
      data.TypePartBody.Product([
        { name: "name", description: "バリアント名", type: coreType.String },
        {
          name: "parameter",
          description: "パラメーター",
          type: coreType.List(type.ElmType),
        },
      ])
    ),
  ],
  [
    id.ElmType,
    t(
      "ElmType",
      "型",
      data.TypePartBody.Sum([
        {
          name: "Int",
          description: "-9007199254740991 ~ 9007199254740991 の範囲の整数",
          parameter: data.Maybe.Nothing(),
        },
      ])
    ),
  ],
]);
