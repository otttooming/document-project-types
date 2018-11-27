import * as React from "react";
import Button from "../../components/Button/Button";
import Container, {
  ContainerVariant,
} from "../../components/Container/Container";
import Flex from "../../components/Grid/Flex/Flex";
import Box from "../../components/Grid/Box/Box";
import { IconType } from "../../components/Icon/Icon";
import { TypeObject } from "typedoc/dist/lib/serialization/browser";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";

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
    return (
      <Container variant={ContainerVariant.HERO}>
        <Flex verticalCenter={true}>
          <Box width={2 / 12}>
            <Button icon={IconType.SEARCH} onClick={this.handleClick}>
              Set
            </Button>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default DashboardView;
