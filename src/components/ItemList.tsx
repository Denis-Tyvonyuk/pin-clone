"use client";

import { items as initialItems } from "@/data"; // Import the initial items
import { useState } from "react";

const ItemList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const [items, setItems] = useState(initialItems); // Local state for items

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setFormData({
        name: item.name,
        price: item.price,
        description: item.description,
      });
      setEditItemId(id);
    }
  };

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
    <div className="h-[75vh] overflow-y-scroll p-4 lg:px-20 xl:px-40">
      <div className="columns-1 sm:columns-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-1 pt-2 pb-2 bg-[#b5c1c4] odd:bg-[#415569] rounded-md ${
              openIndex === index ? "shadow-lg" : ""
            }`}
            onClick={() => toggleItem(index)}
          >
            <div className="w-full flex justify-between gap-4 cursor-pointer">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p
                className={`font-semibold ${
                  openIndex === index ? "hidden" : ""
                }`}
              >
                Price: ${item.price}
              </p>
              {openIndex === index && (
                <button
                  className="bg-white p-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(item.id);
                  }}
                >
                  Edit
                </button>
              )}
            </div>

            {openIndex === index && (
              <div className="w-full p-2 text-black mt-2 transition-all duration-300 ease-in-out">
                <p>
                  {item.description}{" "}
                  <span className="font-semibold">Price: ${item.price}</span>
                </p>
              </div>
            )}
          </div>
        ))}
        {editItemId !== null && (
          <div className="absolute top-[30%] left-[10%] w-[75%]  sm:left-[12.5%]">
            <form
              onSubmit={handleSubmit}
              className="mt-4 bg-gray-200 p-4 rounded "
            >
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
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
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
        )}
      </div>
    </div>
  );
};

export default ItemList;
