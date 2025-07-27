import React, { useState, useEffect } from "react";
import { Position } from "react-flow-renderer";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  ConnectionLineType,
  NodeTypes,
} from "react-flow-renderer";
import NodeModal from "./NodeModal";
import * as service from "../services/accountabilityService";
import type { Stage, Method, Detail } from "../types";
import toast from "react-hot-toast";

const HeaderNode = ({ data }: { data: any }) => (
  <div
    style={{
      padding: 10,
      background: "#1976d2",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: 5,
      minWidth: 120,
      textAlign: "center",
    }}
  >
    {data.label}
  </div>
);

const nodeTypes: NodeTypes = {
  header: HeaderNode,
};

const NODE_HEIGHT = 2;
const MIN_DETAIL_SPACING = NODE_HEIGHT + 1;
const methodBlockPadding = 4;
const stageBlockPadding = 2;

const AccountabilityMap = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const buildGraph = (stages: Stage[], methods: Method[], details: Detail[]) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    const xStage = 0;
    const xMethod = 250;
    const xDetail = 500;

    let currentY = 0;
    const stageNodeIds: string[] = [];

    // Headers
    newNodes.push(
      { id: "header-stage", type: "header", position: { x: xStage, y: -80 }, data: { label: "Pipeline Stages" } },
      { id: "header-method", type: "header", position: { x: xMethod, y: -80 }, data: { label: "Pipeline Methods" } },
      { id: "header-detail", type: "header", position: { x: xDetail, y: -80 }, data: { label: "Pipeline Details" } }
    );

    for (const stage of stages) {
      const stageId = `stage-${stage.id}`;
      stageNodeIds.push(stageId);

      const methodsInStage = methods.filter((m) => m.stage_id === stage.id);

      const methodHeights = methodsInStage.map((method) => {
        const detailCount = details.filter((d) => d.method_id === method.id).length;
        return Math.max(1, detailCount) * MIN_DETAIL_SPACING;
      });

      const stageBlockHeight =
        methodHeights.reduce((sum, h) => sum + h, 0) +
        (methodsInStage.length - 1) * methodBlockPadding;

      const stageY = currentY + stageBlockHeight / 2;

      newNodes.push({
        id: stageId,
        data: { label: stage.name, raw: stage },
        position: { x: xStage, y: stageY },
        type: "default",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      let methodY = currentY;

      for (let i = 0; i < methodsInStage.length; i++) {
        const method = methodsInStage[i];
        const methodId = `method-${method.id}`;
        const methodDetails = details.filter((d) => d.method_id === method.id);

        const blockHeight = methodHeights[i];
        const methodNodeY = methodY + blockHeight / 2;

        newNodes.push({
          id: methodId,
          data: { label: method.name, raw: method },
          position: { x: xMethod, y: methodNodeY },
          type: "default",
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });

        newEdges.push({
          id: `e-stage-method-${stage.id}-${method.id}`,
          source: stageId,
          target: methodId,
          type: "smoothstep",
        });

        const detailCount = methodDetails.length;
        const totalHeight = (detailCount - 1) * MIN_DETAIL_SPACING;
        const detailStartY = methodNodeY - totalHeight / 2;

        methodDetails.forEach((detail, idx) => {
          const detailId = `detail-${detail.id}`;
          const detailY = detailStartY + idx * MIN_DETAIL_SPACING;

          newNodes.push({
            id: detailId,
            data: { label: detail.name, raw: detail },
            position: { x: xDetail, y: detailY },
            type: "default",
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });

          newEdges.push({
            id: `e-method-detail-${method.id}-${detail.id}`,
            source: methodId,
            target: detailId,
            type: "smoothstep",
          });
        });

        methodY += blockHeight + methodBlockPadding;
      }

      currentY = methodY + stageBlockPadding;
    }

    for (let i = 0; i < stageNodeIds.length - 1; i++) {
      newEdges.push({
        id: `e-stage-${stageNodeIds[i]}-${stageNodeIds[i + 1]}`,
        source: stageNodeIds[i],
        target: stageNodeIds[i + 1],
        type: "smoothstep",
      });
    }

    return { newNodes, newEdges };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const stages = await service.fetchStages();
        const methods = await service.fetchMethods();
        const detailsArrays: Detail[][] = await Promise.all(
          methods.map((method) => service.fetchDetailsByMethod(method.id))
        );
        const details = detailsArrays.flat();
        const { newNodes, newEdges } = buildGraph(stages, methods, details);
        setNodes(newNodes);
        setEdges(newEdges);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load map data");
      }
    };
    loadData();
  }, []);

  const handleNodeClick = (_: any, node: Node) => {
    if (!node.id.startsWith("header")) {
      setSelectedNode(node);
    }
  };

  const handleCloseModal = () => setSelectedNode(null);

  const handleAddMethod = async (
    stageId: string,
    methodData: { name: string; description: string; actorIds: string[] }
  ) => {
    try {
      const realStageId = stageId.replace("stage-", "");
      const res = await service.createMethod({
        stage_id: realStageId,
        name: methodData.name,
        description: methodData.description,
        actor_ids: methodData.actorIds,
      });

      const stageNode = nodes.find((n) => n.id === stageId);
      if (!stageNode) return;

      const siblings = nodes.filter(
        (n) => n.id.startsWith("method-") && n.data.raw.stage_id === res.stage_id
      );
      const yPos = stageNode.position.y + siblings.length * 75;

      const newMethodNode: Node = {
        id: `method-${res.id}`,
        data: { label: res.name, raw: res },
        position: { x: 250, y: yPos },
        type: "default",
      };

      const newEdge: Edge = {
        id: `e-stage-method-${stageId}-${newMethodNode.id}`,
        source: stageId,
        target: newMethodNode.id,
        type: "smoothstep",
      };

      setNodes((prev) => [...prev, newMethodNode]);
      setEdges((prev) => [...prev, newEdge]);
      toast.success("Method added successfully!");
    } catch (err) {
      console.error("Error adding method:", err);
      toast.error("Failed to add method");
    }
  };

  const handleAddDetail = async (
    methodId: string,
    detailData: { name: string; value: string; description: string; file?: File }
  ) => {
    try {
      const realMethodId = methodId.replace("method-", "");
      const res = await service.createDetail({ method_id: realMethodId, ...detailData });

      const methodNode = nodes.find((n) => n.id === methodId);
      if (!methodNode) return;

      const siblings = nodes.filter(
        (n) => n.id.startsWith("detail-") && n.data.raw.method_id === res.method_id
      );
      const yPos = methodNode.position.y + siblings.length * MIN_DETAIL_SPACING;

      const newDetailNode: Node = {
        id: `detail-${res.id}`,
        data: { label: res.name, raw: res },
        position: { x: 500, y: yPos },
        type: "default",
      };

      const newEdge: Edge = {
        id: `e-method-detail-${methodId}-${newDetailNode.id}`,
        source: methodId,
        target: newDetailNode.id,
        type: "smoothstep",
      };

      setNodes((prev) => [...prev, newDetailNode]);
      setEdges((prev) => [...prev, newEdge]);
      toast.success("Detail added successfully!");
    } catch (err) {
      console.error("Error adding detail:", err);
      toast.error("Failed to add detail");
    }
  };

  const handleAddActor = async (
    stageId: string,
    actorData: {
      id: string;
      name: string;
      role: string;
      contributions?: string;
      decisions?: string;
      reasons?: string;
    }
  ) => {
    try {
      const realStageId = stageId.replace("stage-", "");
      await service.createResponsibleActor({ ...actorData, stage_id: realStageId });
      toast.success("Actor added and linked to stage.");
    } catch (err) {
      console.error("Failed to add actor:", err);
      toast.error("Error linking actor to stage");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitViewOptions={{ padding: 0.05 }}
        onLoad={(instance: any) => {
          instance.setTransform({ x: 0, y: 0, zoom: 1 });
        }}
        
      >
        <Background />
        <Controls />
      </ReactFlow>

      </div>

      {selectedNode && (
        <NodeModal
          node={selectedNode}
          onClose={handleCloseModal}
          onAddMethod={handleAddMethod}
          onAddDetail={handleAddDetail}
          onAddActor={handleAddActor}
        />
      )}
    </div>
  );
};

export default AccountabilityMap;
