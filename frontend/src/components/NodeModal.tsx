import React, { useEffect, useRef, useState } from "react";
import AddMethodModal, { MethodFormData } from "./AddMethodModal";
import AddDetailModal, { DetailFormData } from "./AddDetailModal";
import AddActorModal, { ActorFormData } from "./AddActorModal";
import * as service from "../services/accountabilityService";
import { Detail, Method, Stage, ResponsibleActor } from "../types";
import html2pdf from "html2pdf.js";

interface NodeModalProps {
  node: any;
  onClose: () => void;
  onAddMethod: (stageId: string, data: MethodFormData) => Promise<void>;
  onAddDetail: (methodId: string, data: DetailFormData) => Promise<void>;
  onAddActor?: (stageId: string, data: ActorFormData) => Promise<void>;
}

const NodeModal: React.FC<NodeModalProps> = ({
  node,
  onClose,
  onAddMethod,
  onAddDetail,
  onAddActor,
}) => {
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showAddDetail, setShowAddDetail] = useState(false);
  const [showAddActor, setShowAddActor] = useState(false);

  const [stageInfo, setStageInfo] = useState<Stage | null>(null);
  const [details, setDetails] = useState<Detail[]>([]);
  const [methodsInStage, setMethodsInStage] = useState<Method[]>([]);

  const reportRef = useRef<HTMLDivElement>(null);

  const isStage = node.id.startsWith("stage-");
  const isMethod = node.id.startsWith("method-");
  const isDetail = node.id.startsWith("detail-");

  useEffect(() => {
    const loadContext = async () => {
      if (isDetail) {
        const detail: Detail = node.data.raw;
        const method = await service.fetchMethodById(detail.method_id);
        const stage = await service.fetchStageById(method.stage_id);
        const allMethods = await service.fetchMethods();
        const relevantMethods = allMethods.filter((m) => m.stage_id === stage.id);

        const detailIds = new Set<string>();
        const uniqueDetails: Detail[] = [];

        for (const m of relevantMethods) {
          const methodDetails = await service.fetchDetailsByMethod(m.id);
          for (const d of methodDetails) {
            if (!detailIds.has(d.id)) {
              detailIds.add(d.id);
              uniqueDetails.push(d);
            }
          }
        }

        setStageInfo(stage);
        setMethodsInStage(relevantMethods);
        setDetails(uniqueDetails);
      }
    };

    loadContext();
  }, [node, isDetail]);

  const handleSubmitMethod = async (data: MethodFormData) => {
    await onAddMethod(node.id, data);
    setShowAddMethod(false);
  };

  const handleSubmitDetail = async (data: DetailFormData) => {
    await onAddDetail(node.id, data);
    setShowAddDetail(false);
  };

  const handleSubmitActor = async (data: ActorFormData) => {
    if (onAddActor) {
      await onAddActor(node.id, data);
      setShowAddActor(false);
    }
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleString();
  };

  const handleExportPDF = async () => {
    if (reportRef.current) {
      // Wait for all images to load
      const images = reportRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (!img.complete) {
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }
          return Promise.resolve();
        })
      );

      // Add watermark
      const watermark = document.createElement("div");
      watermark.innerText = "aidevaccmap";
      Object.assign(watermark.style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        fontSize: "60px",
        color: "rgba(0,0,0,0.1)",
        transform: "translate(-50%, -50%) rotate(-30deg)",
        pointerEvents: "none",
        zIndex: "1000",
      });
      reportRef.current.appendChild(watermark);

      const opt = {
        margin: 0.5,
        filename: `aidevaccmap-report-${node.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, // FIX: useCORS enabled
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .from(reportRef.current)
        .set(opt)
        .save()
        .then(() => {
          reportRef.current?.removeChild(watermark);
        });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {isStage && "Stage Details"}
          {isMethod && "Method Details"}
          {isDetail && "Detail View"}
        </h2>

        {isDetail && (
          <>
            <button style={buttonStyleBlue} onClick={handleExportPDF}>
              Generate Report
            </button>

            <div ref={reportRef}>
              {stageInfo && (
                <p style={{ marginTop: 10 }}>
                  <strong>Stage:</strong> {stageInfo.name}
                </p>
              )}
              <p style={{ marginTop: 5 }}>
                <strong>Generated On:</strong> {new Date().toLocaleString()}
              </p>

              {methodsInStage.map((method, idx) => {
                const detailsOfMethod = details.filter(
                  (d) => d.method_id === method.id
                );
                return (
                  <div key={method.id} style={{ marginTop: 15 }}>
                    <h4>
                      {idx + 1}. {method.name}
                    </h4>
                    <p>{method.description}</p>
                    <p style={{ marginTop: 5 }}>
                      <strong>Method Timestamp:</strong>{" "}
                      {formatTimestamp(method.timestamp || "")}
                    </p>
                    <div style={{ marginTop: 10 }}>
                      <strong>Actors:</strong>
                      <ul>
                        {method.actors.map((actor: ResponsibleActor) => (
                          <li key={actor.id} style={{ marginBottom: 8 }}>
                            <strong>{actor.name}</strong> ({actor.role})<br />
                            <em>Contributions:</em> {actor.contributions || "N/A"} <br />
                            <em>Decisions:</em> {actor.decisions || "N/A"} <br />
                            <em>Reasons:</em> {actor.reasons || "N/A"}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <strong>Details:</strong>
                      {detailsOfMethod.map((d, i) => (
                        <div key={d.id} style={{ marginBottom: 20 }}>
                          <p>
                            <strong>{d.name}</strong>
                          </p>
                          <p>{d.description}</p>
                          <p>
                            <em>{d.value}</em>
                          </p>
                          {d.file_url && (
                            <div style={{ marginTop: 10 }}>
                              {d.file_url.match(/\.(jpeg|jpg|png|gif|bmp|webp)$/i) ? (
                                <img
                                  src={d.file_url}
                                  alt={d.name}
                                  crossOrigin="anonymous"
                                  style={{
                                    width: "100%",
                                    maxHeight: 200,
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <a
                                  href={d.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  style={{ color: "#1976d2", textDecoration: "underline" }}
                                >
                                  📄 Download: {d.name}
                                </a>
                              )}
                            </div>
                          )}
                          {i !== detailsOfMethod.length - 1 && (
                            <hr style={{ marginTop: 15 }} />
                          )}
                        </div>
                      ))}
                    </div>
                    <hr style={{ marginTop: 20 }} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {isStage && (
          <>
            <button style={buttonStyleBlue} onClick={() => setShowAddMethod(true)}>
              Add Method
            </button>
            <button style={buttonStyleGreen} onClick={() => setShowAddActor(true)}>
              Add Actor
            </button>
          </>
        )}

        {isMethod && (
          <button style={buttonStyleGreen} onClick={() => setShowAddDetail(true)}>
            Add Detail
          </button>
        )}

        <button style={buttonStyleGray} onClick={onClose}>
          Close
        </button>

        {showAddMethod && (
          <AddMethodModal
            stageId={node.id}
            onSubmit={handleSubmitMethod}
            onClose={() => setShowAddMethod(false)}
          />
        )}

        {showAddDetail && (
          <AddDetailModal
            methodId={node.id}
            onSubmit={handleSubmitDetail}
            onClose={() => setShowAddDetail(false)}
          />
        )}

        {showAddActor && (
          <AddActorModal
            stageId={node.id}
            onSubmit={handleSubmitActor}
            onClose={() => setShowAddActor(false)}
          />
        )}
      </div>
    </div>
  );
};

const buttonStyleBlue = {
  marginTop: 20,
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const buttonStyleGreen = {
  marginTop: 10,
  backgroundColor: "#2e7d32",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const buttonStyleGray = {
  marginTop: 20,
  marginLeft: 10,
  backgroundColor: "#ccc",
  color: "#000",
  padding: "10px 20px",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

export default NodeModal;
