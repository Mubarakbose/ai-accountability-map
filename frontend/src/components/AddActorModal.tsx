import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ActorFormData {
  id: string;
  name: string;
  role: string;
  contributions?: string;
  decisions?: string;
  reasons?: string;
}

interface AddActorModalProps {
  stageId: string;
  onClose: () => void;
  onSubmit: (data: ActorFormData) => Promise<void>;
}

const AddActorModal: React.FC<AddActorModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ActorFormData>({
    id: uuidv4(),
    name: "",
    role: "",
    contributions: "",
    decisions: "",
    reasons: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Add Responsible Actor</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="hidden" name="id" value={formData.id} />

          <label className="block">
            Name:
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            Role:
            <input name="role" value={formData.role} onChange={handleChange} required className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            Contributions:
            <textarea name="contributions" value={formData.contributions} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            Decisions:
            <textarea name="decisions" value={formData.decisions} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <label className="block">
            Reasons:
            <textarea name="reasons" value={formData.reasons} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActorModal;
