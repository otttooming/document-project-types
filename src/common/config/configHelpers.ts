import { GitHubConfig } from "./configReducer";

function getFileNameWithPath(fileName: string, path: string): string {
  if (fileName.includes(path)) {
    return fileName;
  }

  return [path, fileName].join("");
}

/**
 * Get the URL of the given file on GitHub.
 *
 * @param fileName  The file whose GitHub URL should be determined.
 * @param config  GitHub config.
 * @returns An url pointing to the web preview of the given file or undefined.
 */
export function getGitHubURL(
  fileName: string,
  config: GitHubConfig | null
): string | null {
  if (!config) {
    return null;
  }

  const { user, project, hostname = "github.com", branch, path } = config;

  return [
    `https://${hostname}`,
    user,
    project,
    "blob",
    branch,
    getFileNameWithPath(fileName, path),
  ].join("/");
}
