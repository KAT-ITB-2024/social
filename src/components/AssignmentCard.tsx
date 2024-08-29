"use client";

import { useState } from "react";
import Image from "next/image";

interface AssignmentCardProps {
  status: "terkumpul" | "belumterkumpul" | "terlambat";
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ status }) => {
  let imageUrl: string;
  switch (status) {
    case "terkumpul":
      imageUrl = "/images/conditional/terkumpul.png";
      break;
    case "belumterkumpul":
      imageUrl = "/images/conditional/belumterkumpul.png";
      break;
    case "terlambat":
      imageUrl = "/images/conditional/terlambat.png";
      break;
    default:
      imageUrl = "/images/conditional/terkumpul.png";
  }

  return (
    <div className="bg-sky-200 rounded-3xl border-2 border-teal-500 p-4 w-96 relative">
      <h2 className="text-blue-900 font-bold text-xl mb-2">Tugas Tiktok</h2>
      <p className="text-blue-900 mb-2">
        Deadline: 13 September 2024
      </p>
      <div className="flex items-center mb-4">
        <Image src={imageUrl} alt="Status" width={100} height={100} />
      </div>
      <button
        onClick={() => console.log("Open button clicked")}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
      >
        Open
      </button>
    </div>
  );
};

export default AssignmentCard;