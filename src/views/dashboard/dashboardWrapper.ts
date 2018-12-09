import { connect } from "react-redux";
import { setActiveComponentName } from "../../common/project/projectActions";
import DashboardView, { DispatchProps, StateProps } from "./DashboardView";
import { GlobalState } from "../../reducers";
import {
  selectActiveComponentName,
  selectExtendedTypes,
  selectTypeArgumentsIds,
  selectInterfaceReflection,
  selectActiveComponent,
  selectStateId,
  selectPropsId,
} from "../../common/project/projectSelectors";
import { getGitHubConfig as selectGitHubConfig } from "../../common/config/configSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    activeComponentName: selectActiveComponentName(state),
    activeComponent: selectActiveComponent(state),
    extendedTypes: selectExtendedTypes(state),
    typeArgumentsIds: selectTypeArgumentsIds(state),
    interfaceReflection: selectInterfaceReflection(state),
    gitHubConfig: selectGitHubConfig(state),
    stateId: selectStateId(state),
    propsId: selectPropsId(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  setActiveComponentName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);
