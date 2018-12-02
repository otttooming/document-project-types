import { connect } from "react-redux";
import { findReflection } from "./searchActions";
import SearchView, { DispatchProps, StateProps } from "./SearchView";
import { GlobalState } from "../../reducers";
import { selectSearchQuery } from "./searchSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    searchQuery: selectSearchQuery(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  findReflection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
