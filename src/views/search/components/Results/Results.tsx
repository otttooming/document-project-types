import * as React from "react";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";
import { Table, Alert } from "antd";

import { ViewName } from "../../../../common/routing/routingReducer";

const { Column } = Table;

export interface ResultsState {}

export interface StateProps {
  activeReflections: ProjectReflectionLvl2[] | null;
}

export interface DispatchProps {
  setActiveComponentName: (name: string | null) => void;
  setActiveView: (name: string | null) => void;
}

export type ResultsProps = StateProps & DispatchProps;

interface InternalState {}

class Results extends React.Component<ResultsProps, InternalState> {
  handleOnClick = (name: string) => (
    event: React.SyntheticEvent<HTMLAnchorElement>
  ) => {
    const { setActiveComponentName, setActiveView } = this.props;

    event.preventDefault();
    setActiveComponentName(name);
    setActiveView(ViewName.Dashboard);
  };

  render() {
    const { activeReflections } = this.props;

    if (!activeReflections) {
      return (
        <Alert
          message="Search for type definitions"
          description="Here will be a list of found type definitons."
          type="info"
          showIcon
        />
      );
    }

    const data = activeReflections.map((item, index) => {
      const { name, kindString } = item;

      return {
        key: index,
        name,
        kindString,
      };
    });

    return (
      <>
        <Table
          dataSource={data}
          pagination={false}
          style={{ marginBottom: 32 }}
          size="middle"
        >
          <Column
            title="Props"
            dataIndex="name"
            key="name"
            render={name => (
              <a href="#" onClick={this.handleOnClick(name)}>
                <code style={{ fontSize: 12 }}>{name}</code>
              </a>
            )}
            width={300}
          />
          <Column
            title="Kind"
            dataIndex="kindString"
            key="kindString"
            render={description => (
              <code style={{ fontSize: 12 }}>{description}</code>
            )}
          />
        </Table>
      </>
    );
  }
}

export default Results;
