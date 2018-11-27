import * as React from "react";
import Container from "../../components/Container/Container";
import { TypeObject } from "typedoc/dist/lib/serialization/browser";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";
import { Button } from "antd";
import Reflection from "../../components/Reflection/Reflection";

export interface StateProps {
  activeComponentName: string | null;
  extendedTypes: TypeObject[] | null;
  typeArgumentsIds: number[] | null;
  interfaceReflection: ProjectReflectionLvl2[] | null;
}

export interface DispatchProps {
  setActiveComponentName: (name: string) => void;
}

export type DashboardViewProps = StateProps & DispatchProps;

interface InternalState {
  isUploadShowing: boolean;
  selectedPerson: string | null;
  showAllPersons: boolean;
  csv: File | null;
}

class DashboardView extends React.Component<DashboardViewProps, InternalState> {
  private pageSize: number = 20;

  constructor(props: DashboardViewProps) {
    super(props);

    this.state = {
      isUploadShowing: false,
      selectedPerson: null,
      showAllPersons: false,
      csv: null,
    };
  }

  handleClick = () => {
    this.props.setActiveComponentName("constructor-type");
  };

  render() {
    const { interfaceReflection } = this.props;

    return (
      <Container>
        {Array.isArray(interfaceReflection) &&
          interfaceReflection.map((item, index) => (
            <Reflection key={index} reflection={item} />
          ))}

        <Button onClick={this.handleClick}>Set</Button>
      </Container>
    );
  }
}

export default DashboardView;
