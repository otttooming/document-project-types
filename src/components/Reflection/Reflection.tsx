import * as React from "react";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";
import { Table, Tag, Divider, Icon } from "antd";
import { TypeObject } from "typedoc/dist/lib/serialization/browser";

const { Column } = Table;

export interface ReflectionProps {
  reflection: ProjectReflectionLvl2;
}

export interface ReflectionState {}

class Reflection extends React.Component<ReflectionProps, ReflectionState> {
  getType = (type: TypeObject | undefined) => {
    if (!type) {
      return undefined;
    }

    if (Array.isArray(type.types)) {
      return type.types.map(item => item.name).join(" | ");
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

    const data = children.map(({ name, type, flags }, index) => {
      const typeDefinition = this.getType(type);

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
                return <Tag>{name}</Tag>;
              }

              return (
                <Tag color="#87d068">
                  <Icon type="check" /> {name}
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
