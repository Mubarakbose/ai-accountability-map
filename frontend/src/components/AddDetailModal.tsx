import React, { useState } from "react";
import toast from "react-hot-toast";

export interface DetailFormData {
  name: string;
  value: string;
  description: string;
  file?: File;
}

interface AddDetailModalProps {
  methodId: string;
  onSubmit: (data: DetailFormData) => Promise<void>;
  onClose: () => void;
}

const AddDetailModal: React.FC<AddDetailModalProps> = ({ methodId, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<DetailFormData>({
    name: "",
    value: "",
    description: "",
    file: undefined,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch {
      toast.error("Error adding detail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Add Pipeline Detail</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Detail Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="name">
              Detail Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Detail Name"
              className="border p-2 rounded w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Value */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="value">
              Value
            </label>
            <input
              type="text"
              id="value"
              name="value"
              placeholder="Value"
              className="border p-2 rounded w-full"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description (full width) */}
          <div className="flex flex-col col-span-2">
            <label className="font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="border p-2 rounded w-full resize-y"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* File Upload (full width) */}
          <div className="flex flex-col col-span-2">
            <label className="font-semibold mb-1" htmlFor="file">
              File (optional)
            </label>
            <input
              type="file"
              id="file"
              className="border p-2 rounded"
              onChange={handleFileChange}
            />
          </div>

          {/* Buttons full width and right aligned */}
          <div className="flex justify-end col-span-2 space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 transition"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-4 py-2 text-white rounded transition ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetailModal;
