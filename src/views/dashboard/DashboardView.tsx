import * as React from "react";
import { TypeObject } from "typedoc/dist/lib/serialization/browser";
import {
  ProjectReflectionLvl2,
  ProjectReflectionLvl4,
} from "src/common/projectReflection";
import { Alert, Divider } from "antd";
import Reflection from "../../components/Reflection/Reflection";

export interface StateProps {
  activeComponentName: string | null;
  activeComponent: ProjectReflectionLvl2 | null;
  extendedTypes: TypeObject[] | null;
  typeArgumentsIds: number[] | null;
  interfaceReflection: ProjectReflectionLvl2[] | null;
  stateId: number | null;
  propsId: number | null;
  defaultProps: ProjectReflectionLvl4[] | null;
}

export interface DispatchProps {
  setActiveComponentName: (name: string) => void;
}

export type DashboardViewProps = StateProps & DispatchProps;

interface InternalState {}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  constructor(props: DashboardViewProps) {
    super(props);
  }

  render() {
    const {
      interfaceReflection,
      activeComponent,
      defaultProps,
      propsId,
    } = this.props;

    if (!activeComponent) {
      return (
        <Alert
          message="Type definitions"
          description="When you pass an name or search for type definitions this will populate here."
          type="info"
          showIcon
        />
      );
    }

    const { name } = activeComponent;

    return (
      <>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "2em" }}>{name}</h1>
        </div>

        <Divider />

        {Array.isArray(interfaceReflection) &&
          interfaceReflection.map((item, index) => (
            <Reflection
              key={index}
              reflection={item}
              defaulProps={defaultProps}
              propsId={propsId}
            />
          ))}
      </>
    );
  }
}

export default DashboardView;
