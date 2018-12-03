import { connect } from "react-redux";
import { findReflection } from "./searchActions";
import SearchView, { DispatchProps, StateProps } from "./SearchView";
import { GlobalState } from "../../reducers";
import {
  selectSearchQuery,
  selectFoundReflections,
  selectActiveReflectionList,
} from "./searchSelectors";
import { setActiveComponentName } from "../../common/project/projectActions";
import { setActiveView } from "../../common/routing/routingActions";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    searchQuery: selectSearchQuery(state),
    foundReflections: selectFoundReflections(state),
    activeReflections: selectActiveReflectionList(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  findReflection,
  setActiveComponentName,
  setActiveView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
