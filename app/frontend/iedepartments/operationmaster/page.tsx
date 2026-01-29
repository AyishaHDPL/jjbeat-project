"use client"
import OperationMasterPopup from "@/app/component/operationmasterpopup"
import { useState } from "react"

export default function OperationMaster() {
    const [operationPopup, setOperationPopup] = useState<Boolean>(false)
    return (
       <>
       <div className="flex justify-between">
        <h1>Operation Master</h1>
         <button className="text-black font-semibold bg-gradient-to-br from-blue-400 to-navy-200 p-2 rounded-sm cursor-pointer" onClick={()=>setOperationPopup(true)}>+ Add Operation</button>
       </div>
       {operationPopup &&
       <OperationMasterPopup/>}
       </>
    )
}