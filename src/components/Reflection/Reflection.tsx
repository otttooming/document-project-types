import * as React from "react";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";
import { Table, Tag, Divider } from "antd";
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

    if (type.name) {
      return type.name;
    }

    return (
      Array.isArray(type.types) && type.types.map(item => item.name).join(" | ")
    );
  };

  render() {
    const {
      reflection: { children, name, kindString },
    } = this.props;

    const data = children.map(({ name, type }, index) => {
      const typeDefinition = this.getType(type);

      return {
        key: index,
        name,
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
        >
          <Column
            title="Props"
            dataIndex="name"
            key="name"
            render={tag => (
              <span>
                <Tag color="blue">{tag}</Tag>
              </span>
            )}
            width={300}
          />
          <Column
            title="Description"
            dataIndex="type"
            key="type"
            render={description => <code>{description}</code>}
          />
        </Table>
      </div>
    );
  }
}

export default Reflection;
