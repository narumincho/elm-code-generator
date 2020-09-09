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
          type: type.ElmTypeName,
        },
        {
          name: "export",
          description: "外部に公開するか",
          type: coreType.Bool,
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
          type: type.FieldName,
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
    id.FieldName,
    t(
      "FieldName",
      "フィールド名",
      data.TypePartBody.Sum([
        {
          name: "FieldName",
          description: `**直接 FieldName.FieldName("name") と指定してはいけない!! Elmの識別子として使える文字としてチェックできないため**`,
          parameter: data.Maybe.Just(coreType.String),
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
        { name: "name", description: "カスタム型名", type: type.ElmTypeName },
        {
          name: "export",
          description: "外部に公開するレベル",
          type: type.CustomTypeExportLevel,
        },
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
    id.CustomTypeExportLevel,
    t(
      "CustomTypeExportLevel",
      "カスタム型の公開レベル",
      data.TypePartBody.Sum([
        {
          name: "NoExport",
          description: "公開しない",
          parameter: data.Maybe.Nothing(),
        },
        {
          name: "ExportTypeOnly",
          description:
            "型の指定のみ公開. 外部のモジュールで値の構成とパターンマッチングの分岐がされることはない",
          parameter: data.Maybe.Nothing(),
        },
        {
          name: "ExportTypeAndVariant",
          description:
            "型とバリアントを公開する. 外部のモジュールで値の構成とパターンマッチングができる",
          parameter: data.Maybe.Nothing(),
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
        { name: "name", description: "バリアント名", type: type.VariantName },
        {
          name: "parameter",
          description: "パラメーター",
          type: coreType.List(type.ElmType),
        },
      ])
    ),
  ],
  [
    id.VariantName,
    t(
      "VariantName",
      "バリアント名",
      data.TypePartBody.Sum([
        {
          name: "VariantName",
          description: `**直接 VariantName.VariantName("Loading") と指定してはいけない!! Elmの識別子として使える文字としてチェックできないため**`,
          parameter: data.Maybe.Just(coreType.String),
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
          name: "ImportedType",
          description: "インポートした型",
          parameter: data.Maybe.Just(type.ImportedType),
        },
        {
          name: "LocalType",
          description: "モジュール内にある型",
          parameter: data.Maybe.Just(type.ElmTypeName),
        },
        {
          name: "Function",
          description: "関数",
          parameter: data.Maybe.Just(type.FunctionType),
        },
        {
          name: "Tuple0",
          description: "() 値を1つだけ持つ型. Unit",
          parameter: data.Maybe.Nothing(),
        },
        {
          name: "Tuple2",
          description: "(a, b)",
          parameter: data.Maybe.Just(type.Tuple2),
        },
        {
          name: "Tuple3",
          description: "(a, b, c)",
          parameter: data.Maybe.Just(type.Tuple3),
        },
      ])
    ),
  ],
  [
    id.ElmTypeName,
    t(
      "ElmTypeName",
      "Elmで使う型の名前. Elmで使える型名ということを確認済み",
      data.TypePartBody.Sum([
        {
          name: "ElmTypeName",
          description: `**直接 ElmTypeName.ElmTypeName("Int") と指定してはいけない!! Elmの識別子として使える文字としてチェックできないため**`,
          parameter: data.Maybe.Just(coreType.String),
        },
      ])
    ),
  ],
  [
    id.ImportedType,
    t(
      "ImportedType",
      "外部のモジュールの型",
      data.TypePartBody.Product([
        {
          name: "moduleName",
          description: "モジュール名",
          type: coreType.String,
        },
        {
          name: "typeName",
          description: "型名",
          type: type.ElmTypeName,
        },
      ])
    ),
  ],
  [
    id.FunctionType,
    t(
      "FunctionType",
      "関数の型. 入力と出力",
      data.TypePartBody.Product([
        {
          name: "input",
          description: "入力の型",
          type: type.ElmType,
        },
        {
          name: "output",
          description: "出力の型",
          type: type.ElmType,
        },
      ])
    ),
  ],
  [
    id.Tuple2,
    t(
      "Tuple2",
      "2つの要素のタプルの型",
      data.TypePartBody.Product([
        {
          name: "first",
          description: "左の型",
          type: type.ElmType,
        },
        {
          name: "second",
          description: "右の型",
          type: type.ElmType,
        },
      ])
    ),
  ],
  [
    id.Tuple3,
    t(
      "Tuple3",
      "3つの要素のタプルの型",
      data.TypePartBody.Product([
        {
          name: "first",
          description: "左の型",
          type: type.ElmType,
        },
        {
          name: "second",
          description: "真ん中の型",
          type: type.ElmType,
        },
        {
          name: "third",
          description: "右の型",
          type: type.ElmType,
        },
      ])
    ),
  ],
]);
