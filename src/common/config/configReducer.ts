import { handleActions } from "redux-actions";

export interface GitHubConfig {
  /**
   * The root path of this repository.
   */
  path: string;

  /**
   * The name of the branch this repository is on right now.
   */
  branch: string;

  /**
   * The user/organisation name of this repository on GitHub.
   */
  user: string;

  /**
   * The project name of this repository on GitHub.
   */
  project: string;

  /**
   * The hostname for this github project.
   *
   * Defaults to: `github.com` (for normal, public GitHub instance projects)
   *
   * Or the hostname for an enterprise version of GitHub, e.g. `github.acme.com`
   * (if found as a match in the list of git remotes).
   */
  hostname?: string;
}

class State {
  gitHub: GitHubConfig | null = null;
}

export default handleActions<State, any>({}, new State());

export { State as ConfigState };
