import * as React from "react";
import {
  ProjectReflectionLvl2,
  ProjectReflectionLvl3,
} from "src/common/projectReflection";
import { Table, Tag, Divider, Icon } from "antd";
import {
  TypeObject,
  DeclarationReflectionContainer,
  SignatureReflectionObject,
  ReflectionObject,
} from "typedoc/dist/lib/serialization/browser";

const { Column } = Table;

export interface ReflectionProps {
  reflection: ProjectReflectionLvl2;
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

  render() {
    const {
      reflection: { children, name, kindString },
    } = this.props;

    if (!children) {
      return null;
    }

    const data = children.map((item, index) => {
      const { name, flags } = item;
      const typeDefinition = this.getType(item);

      return {
        key: index,
        tag: { name, flags },
        type: typeDefinition,
      };
    });

    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>
            <code>{name}</code>
          </h2>

          <Divider type="vertical" />

          <p>
            <code style={{ fontSize: 12 }}> | {kindString}</code>
          </p>
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
              if (flags.isOptional) {
                return (
                  <Tag>
                    <code>{name}</code>
                  </Tag>
                );
              }

              return (
                <Tag color="#87d068">
                  <Icon type="check" /> <code>{name}</code>
                </Tag>
              );
            }}
            width={300}
          />
          <Column
            title="Description"
            dataIndex="type"
            key="type"
            render={description => (
              <code style={{ fontSize: 12 }}>{description}</code>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default Reflection;
