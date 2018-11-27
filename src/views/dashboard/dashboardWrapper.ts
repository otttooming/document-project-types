import { connect } from "react-redux";
import { setActiveComponentName } from "./dashboardActions";
import DashboardView, { DispatchProps, StateProps } from "./DashboardView";
import { GlobalState } from "../../reducers";
import {
  selectActiveComponentName,
  selectExtendedTypes,
  selectTypeArgumentsIds,
  selectInterfaceReflection,
} from "./dashboardSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    activeComponentName: selectActiveComponentName(state),
    extendedTypes: selectExtendedTypes(state),
    typeArgumentsIds: selectTypeArgumentsIds(state),
    interfaceReflection: selectInterfaceReflection(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  setActiveComponentName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);
