import * as React from "react";
import * as ReactCopyToClipboard from "react-copy-to-clipboard";
import { message } from "antd";

export interface CopyToClipboardProps {
  text: string;
}

class CopyToClipboard extends React.Component<CopyToClipboardProps, {}> {
  render() {
    const { children, text } = this.props;

    return (
      <ReactCopyToClipboard
        text={text}
        onCopy={() => message.success(`Copied to clipboard: ${text}`)}
      >
        {children}
      </ReactCopyToClipboard>
    );
  }
}

export default CopyToClipboard;
