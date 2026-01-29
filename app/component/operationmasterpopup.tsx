"use client";

import { useState } from "react";
import CommonInputField from "./inputfield";

export default function OperationMasterPopup() {
  const [operationMasterDetails, setOperationMasterDetails] = useState({
    operationCode: "",
    masterOperation: "",
    sequenceCode: "",
    sequenceDetail: "",
    smv: "",
    hindi: "",
    tamil: "",
    medicineCode: "",
    skillGrade: "",
    comments: "",
  })
  const onhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOperationMasterDetails((prev) => ({ ...prev, [name]: value }));
  }
  const fields = [
    {
      label: "Operation Code",
      type: "text",
      placeholder: "Operation Code",
      name: "operationCode",
      value: operationMasterDetails.operationCode,
      onChange:onhandleChange
    },
    {
      label: "Master Operation",
      type: "text",
      placeholder: "Master Operation",
      name: "masterOperation",
      value: operationMasterDetails.masterOperation,
        onChange:onhandleChange
    },
    { label: "Sequence code", type: "text", placeholder: "Sequence code", name: "sequenceCode", value: operationMasterDetails.sequenceCode, onChange:onhandleChange },
    {
      label: "Sequence Detail",
      type: "text",
      placeholder: "Sequence Detail",
      name: "sequenceDetail",
      value: operationMasterDetails.sequenceDetail,
      onChange:onhandleChange
    },
    { label: "SMV", type: "text", placeholder: "SMV", name: "smv", value: operationMasterDetails.smv, onChange:onhandleChange },
    { label: "Hindi", type: "text", placeholder: "Hindi", name: "hindi", value: operationMasterDetails.hindi, onChange:onhandleChange },
    { label: "Tamil", type: "text", placeholder: "Tamil", name: "tamil", value: operationMasterDetails.tamil, onChange:onhandleChange },
    { label: "Medicine Code", type: "text", placeholder: "Medicine Code", name: "medicineCode", value: operationMasterDetails.medicineCode, onChange:onhandleChange },
    { label: "Skill Grade", type: "text", placeholder: "Skill Grade", name: "skillGrade", value: operationMasterDetails.skillGrade, onChange:onhandleChange },
    { label: "Comments", type: "text", placeholder: "Comments", name: "comments", value: operationMasterDetails.comments, onChange:onhandleChange },
  ];
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999] p-4">
        <div className="bg-white w-full sm:w-[700px] rounded-lg shadow-xl p-6 max-h-[50vh] overflow-y-auto relative scrollbar-hide">
          <button
            className="absolute right-4 top-4 w-6 h-6 flex items-center justify-center 
          rounded-sm bg-gray-200 text-black shadow-sm cursor-pointer
          text-medium leading-none"
          >
            ✕
          </button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Operation Master Forms
            </h2>
          </div>
          <div className="flex grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <CommonInputField
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              name={field.name}
              type={field.type}
              onChange={field.onChange}
            />
          ))}
          </div>
          <div className="flex justify-end gap-4">
            <button className="bg-green-800 px-4 py-2 text-white rounded-sm" >Submit</button>
            <button className="bg-red-800 px-4 py-2 text-white rounded-sm cursor-pointer">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
