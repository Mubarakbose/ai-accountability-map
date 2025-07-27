import React from "react";
import { NodeProps } from "react-flow-renderer";

interface HeaderNodeData {
  label: string;
  raw?: any;
}

const HeaderNode: React.FC<NodeProps<HeaderNodeData>> = ({ data }) => {
  return (
    <div style={{ padding: 10, background: "#f0f0f0", borderRadius: 5 }}>
      <strong>{data.label}</strong>
    </div>
  );
};

export default HeaderNode;
