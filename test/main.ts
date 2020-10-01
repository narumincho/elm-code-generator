import * as data from "../source/data";
import * as main from "../source/main";
import * as util from "../source/util";

describe("test", () => {
  it("type name validation valid", () => {
    expect(main.elmTypeNameFromString("Data")).toEqual<
      data.Maybe<data.ElmTypeName>
    >(data.Maybe.Just(data.ElmTypeName.ElmTypeName("Data")));
  });

  it("type name validation invalid", () => {
    expect(main.elmTypeNameFromString("それな")).toEqual<
      data.Maybe<data.ElmTypeName>
    >(data.Maybe.Nothing());
  });

  it("output variant", () => {
    const colorTypeName = main.elmTypeNameFromString("Color");
    switch (colorTypeName._) {
      case "Just": {
        const sampleElmCode: data.Code = {
          moduleName: "Main",
          typeDeclarationList: [
            data.TypeDeclaration.CustomType({
              name: colorTypeName.value,
              export: data.CustomTypeExportLevel.ExportTypeAndVariant,
              comment: "色",
              parameter: [],
              variantList: [
                {
                  name: main.variantNameFormStringOrThrow("Red"),
                  parameter: [],
                },
                {
                  name: main.variantNameFormStringOrThrow("Green"),
                  parameter: [],
                },
                {
                  name: main.variantNameFormStringOrThrow("Blue"),
                  parameter: [],
                },
              ],
            }),
          ],
        };
        expect(main.codeToString(sampleElmCode)).toMatchSnapshot();
        return;
      }
      case "Nothing":
        fail();
    }
  });

  it("output type alias", () => {
    const sampleElmCode: data.Code = {
      moduleName: "Main",
      typeDeclarationList: [
        data.TypeDeclaration.TypeAlias({
          name: main.elmTypeNameFromStringOrThrow("User"),
          export: false,
          comment: "色",
          parameter: [],
          type: data.ElmType.Record([
            {
              name: main.fieldNameFromStringOrThrow("name"),
              type: util.String,
            },
            {
              name: main.fieldNameFromStringOrThrow("age"),
              type: util.Int,
            },
          ]),
        }),
      ],
    };
    expect(main.codeToString(sampleElmCode)).toMatchSnapshot();
  });

  it("invalid filed name", () => {
    expect(() => {
      const sampleElmCode: data.Code = {
        moduleName: "Main",
        typeDeclarationList: [
          data.TypeDeclaration.TypeAlias({
            name: main.elmTypeNameFromStringOrThrow("IncludeInvalidFiledName"),
            export: false,
            comment: "",
            parameter: [],
            type: data.ElmType.Record([
              {
                name: main.fieldNameFromStringOrThrow("then"),
                type: util.String,
              },
            ]),
          }),
        ],
      };

      main.codeToString(sampleElmCode);
    }).toThrowErrorMatchingSnapshot();
  });

  it("output (List Int) -> String", () => {
    const sampleElmCode: data.Code = {
      moduleName: "Main",
      typeDeclarationList: [
        data.TypeDeclaration.TypeAlias({
          name: main.elmTypeNameFromStringOrThrow("IntListToString"),
          export: false,
          comment: "List Int -> Stringの型",
          parameter: [],
          type: data.ElmType.Function({
            input: util.List(util.Int),
            output: util.String,
          }),
        }),
      ],
    };
    expect(main.codeToString(sampleElmCode)).toMatchSnapshot();
  });

  it("output type parameter", () => {
    const sampleCode: data.Code = {
      moduleName: "Main",
      typeDeclarationList: [
        data.TypeDeclaration.TypeAlias({
          name: main.elmTypeNameFromStringOrThrow("WithParameter"),
          export: false,
          comment: "型パラメーターがつくもの",
          parameter: ["element"],
          type: data.ElmType.Record([
            {
              name: main.fieldNameFromStringOrThrow("field"),
              type: data.ElmType.TypeParameter("element"),
            },
          ]),
        }),
      ],
    };
    expect(main.codeToString(sampleCode)).toMatchSnapshot();
  });
});
