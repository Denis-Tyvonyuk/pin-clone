"use client";

import { useState } from "react";

const EditForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editItemId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editItemId
          ? { ...item, ...formData } // Update the item with new form data
          : item
      );

      setItems(updatedItems); // Set the new items state
    }

    setOpenIndex(null);
    setEditItemId(null);
    setFormData({ name: "", price: 0, description: "" });
  };

  return (
    <div className="absolute top-[30%] left-[10%] w-[75%]  sm:left-[12.5%]">
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-200 p-4 rounded ">
        <h3 className="text-lg font-bold">Edit Item</h3>
        <div className="mb-2">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-1 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded p-1 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded ml-2"
          onClick={() => setEditItemId(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
