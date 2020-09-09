import * as data from "../data";
import * as main from "../main";

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
                { name: "Red", parameter: [] },
                { name: "Green", parameter: [] },
                { name: "Blue", parameter: [] },
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
          fieldList: [
            {
              name: "name",
              type: data.ElmType.ImportedType({
                moduleName: "String",
                typeName: main.elmTypeNameFromStringOrThrow("String"),
              }),
            },
            {
              name: "age",
              type: data.ElmType.ImportedType({
                moduleName: "Basics",
                typeName: main.elmTypeNameFromStringOrThrow("Int"),
              }),
            },
          ],
        }),
      ],
    };
    expect(main.codeToString(sampleElmCode)).toMatchSnapshot();
  });
});
