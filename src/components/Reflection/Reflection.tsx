import * as React from "react";
import {
  ProjectReflectionLvl2,
  ProjectReflectionLvl3,
  ProjectReflectionLvl4,
} from "src/common/projectReflection";
import { Table, Tag, Divider, Icon } from "antd";
import {
  TypeObject,
  DeclarationReflectionContainer,
  SignatureReflectionObject,
  ReflectionObject,
} from "typedoc/dist/lib/serialization/browser";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";

const { Column } = Table;

export interface ReflectionProps {
  reflection: ProjectReflectionLvl2;
  defaulProps: ProjectReflectionLvl4[] | null;
  propsId: number | null;
}

export interface ReflectionState {}

class Reflection extends React.Component<ReflectionProps, ReflectionState> {
  getIsReflectionType = (type: TypeObject | undefined): boolean => {
    if (!type || type.type !== "reflection") {
      return false;
    }

    return true;
  };

  getReflection = (
    declaration:
      | ReflectionObject &
          DeclarationReflectionContainer<SignatureReflectionObject>
      | undefined
  ) => {
    if (!declaration || !declaration.signatures) {
      return [];
    }

    return declaration.signatures.map(({ parameters = [], type }) => {
      const args = parameters.map(item => `${item.name}: ${item.type.value}`);

      return `(${args.join(", ")}) => ${!!type && type.name}`;
    });
  };

  getType = (reflection: ProjectReflectionLvl3 | undefined) => {
    if (!reflection || !reflection.type) {
      return undefined;
    }

    const { type, flags } = reflection;

    if (Array.isArray(type.types)) {
      return type.types
        .reduce((acc, cur) => {
          const isOptionalAndUndefined: boolean =
            cur.name === "undefined" && Boolean(flags.isOptional);

          if (isOptionalAndUndefined) {
            return acc;
          }

          const isBooleanType: boolean =
            cur.name === "true" || cur.name === "false";

          if (isBooleanType) {
            return [...new Set([...acc, "boolean"])];
          }

          if (this.getIsReflectionType(cur)) {
            return [...acc, ...this.getReflection(cur.declaration)];
          }

          return [...acc, cur.name];
        }, [])
        .join(" | ");
    }

    if (type.type === "array" && type.elementType) {
      return <>{type.elementType.name}[]</>;
    }

    if (this.getIsReflectionType(type)) {
      return this.getReflection(type.declaration).join(" | ");
    }

    return type.name;
  };

  getIsProps = (id: number): boolean => {
    const { propsId } = this.props;

    return id === propsId;
  };

  getIsDefinedInDefaultProps = (name: string): boolean => {
    const { defaulProps } = this.props;

    if (!Array.isArray(defaulProps)) {
      return false;
    }

    const isNameMatchedInDefaultProps: boolean = !!defaulProps.find(
      item => item.name === name
    );

    return isNameMatchedInDefaultProps;
  };

  /**
   * isOptional may be defined specifically or matched with defaultProps.
   * If defined in defaultProps we set the prop to optional.
   */
  getIsOptional = (name: string, isOptional: boolean): boolean => {
    const {
      reflection: { id },
    } = this.props;

    if (this.getIsProps(id) && this.getIsDefinedInDefaultProps(name)) {
      return true;
    }

    return isOptional;
  };

  getDefaultValue = ({ name }: ProjectReflectionLvl3) => {
    const { defaulProps } = this.props;

    if (!Array.isArray(defaulProps) || !this.getIsDefinedInDefaultProps(name)) {
      return undefined;
    }

    const matchedDefaultProps: any = defaulProps.find(
      item => item.name === name
    );

    if (!matchedDefaultProps) {
      return undefined;
    }

    if (Array.isArray(matchedDefaultProps.children)) {
      return matchedDefaultProps.children.map((item: any) => item.defaultValue);
    }

    return matchedDefaultProps.defaultValue;
  };

  getComment = (item: ProjectReflectionLvl3) => {
    if (!item.comment) {
      return undefined;
    }

    return item.comment.shortText;
  };

  renderExtendsInterface = () => {
    const {
      reflection: { extendedTypes },
    } = this.props;

    if (!Array.isArray(extendedTypes)) {
      return null;
    }

    const isPartialExtended: boolean =
      extendedTypes.length === 1 &&
      !!extendedTypes.find(
        ({ declaration }) =>
          !!declaration && declaration.kindString === "Type literal"
      );

    if (isPartialExtended) {
      return null;
    }

    return (
      <>
        <code
          style={{
            fontSize: 12,
            display: "inline-block",
            margin: "0 16px 0",
          }}
        >
          extends
        </code>

        {extendedTypes.map(({ name }, index) => (
          <code key={index}>{name}</code>
        ))}
      </>
    );
  };

  render() {
    const {
      reflection: { children, name, kindString },
    } = this.props;

    if (!children) {
      return null;
    }

    const data = children.map((item, index) => {
      const { name, flags } = item;
      const type = this.getType(item);
      const defaultValue = this.getDefaultValue(item);
      const comment = this.getComment(item);

      return {
        key: index,
        tag: { name, flags },
        desc: { type, comment },
        defaultValue,
      };
    });

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          <h2>
            <code>{name}</code>
          </h2>

          <p>{this.renderExtendsInterface()}</p>

          <div style={{ width: "100%" }}>
            <Tag>
              <code>{kindString}</code>
            </Tag>
          </div>
        </div>

        <Table
          dataSource={data}
          pagination={false}
          style={{ marginBottom: 32 }}
          size="middle"
        >
          <Column
            title="Props"
            dataIndex="tag"
            key="tag"
            render={({ name, flags }) => {
              if (this.getIsOptional(name, flags.isOptional)) {
                return (
                  <CopyToClipboard text={name}>
                    <Tag>
                      <code>{name}</code>
                    </Tag>
                  </CopyToClipboard>
                );
              }

              return (
                <CopyToClipboard text={name}>
                  <Tag color="#87d068">
                    <Icon type="check" /> <code>{name}</code>
                  </Tag>
                </CopyToClipboard>
              );
            }}
            width={300}
          />
          <Column
            title="Description"
            dataIndex="desc"
            key="desc"
            render={({ type, comment }) => (
              <>
                <div>
                  <code style={{ fontSize: 12 }}>{type}</code>
                </div>
                {!!comment && (
                  <>
                    <Divider />
                    <code style={{ fontSize: 12 }}>{comment}</code>
                  </>
                )}
              </>
            )}
          />
          <Column
            title="Default"
            dataIndex="defaultValue"
            key="defaultValue"
            render={defaultValue => (
              <code style={{ fontSize: 12 }}>{defaultValue}</code>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default Reflection;
