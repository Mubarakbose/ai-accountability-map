import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as service from "../services/accountabilityService";

// ✅ Use camelCase keys to match frontend/backend mapping logic
export interface MethodFormData {
  name: string;
  description: string;
  actorIds: string[]; // ✅ changed from actor_ids to actorIds
}

interface AddMethodModalProps {
  stageId: string;
  onClose: () => void;
  onSubmit: (method: MethodFormData) => Promise<void>;
}

const AddMethodModal: React.FC<AddMethodModalProps> = ({ stageId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<MethodFormData>({
    name: "",
    description: "",
    actorIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [allActors, setAllActors] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actors = await service.fetchAllActors();
        setAllActors(actors);
      } catch (err) {
        toast.error("Failed to load actors");
      }
    };
    fetchActors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, actorIds: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.actorIds.length === 0) {
      toast.error("Please select at least one actor");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      toast.success("Method added successfully!");
      onClose();
    } catch (error) {
      toast.error("Error adding method");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg p-6 w-full"
        style={{
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add Pipeline Method</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Responsible Actors</label>
            <select
              multiple
              value={formData.actorIds}
              onChange={handleActorSelect}
              className="w-full p-2 border rounded"
              required
            >
              {allActors.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {actor.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMethodModal;
