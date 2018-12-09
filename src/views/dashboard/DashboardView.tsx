import * as React from "react";
import { TypeObject } from "typedoc/dist/lib/serialization/browser";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";
import { Icon } from "antd";
import Reflection from "../../components/Reflection/Reflection";
import { GitHubConfig } from "../../common/config/configReducer";
import { getGitHubURL } from "../../common/config/configHelpers";

export interface StateProps {
  activeComponentName: string | null;
  activeComponent: ProjectReflectionLvl2 | null;
  extendedTypes: TypeObject[] | null;
  typeArgumentsIds: number[] | null;
  interfaceReflection: ProjectReflectionLvl2[] | null;
  gitHubConfig: GitHubConfig | null;
  stateId: number | null;
  propsId: number | null;
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

  render() {
    const { interfaceReflection, activeComponent, gitHubConfig } = this.props;

    if (!activeComponent) {
      return null;
    }

    const { name, sources } = activeComponent;

    return (
      <>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "2em" }}>{name}</h1>
          {sources.map(({ fileName }, key) => (
            <p key={key}>
              <a href={getGitHubURL(fileName, gitHubConfig)} target="_blank">
                <Icon type="github" /> View source on GitHub
              </a>
            </p>
          ))}
        </div>

        {Array.isArray(interfaceReflection) &&
          interfaceReflection.map((item, index) => (
            <Reflection key={index} reflection={item} />
          ))}
      </>
    );
  }
}

export default DashboardView;
