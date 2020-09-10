import * as data from "../data";
import * as main from "../main";
import * as util from "../util";

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
          type: data.ElmType.Function({
            input: util.List(util.Int),
            output: util.String,
          }),
        }),
      ],
    };
    expect(main.codeToString(sampleElmCode)).toMatchSnapshot();
  });
});
