"use client";

import { methofGetWithoutParameter } from "@/app/component/service";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

interface ModuleItem {
  module_id: number;
  module_name: string;
}

type GroupedModules = {
  [moduleType: string]: ModuleItem[];
};

interface ModuleListApiResponse {
  message: string;
  success: boolean;
  data: GroupedModules;
}

/* ================= COMPONENT ================= */

export default function Dashboard() {
  const [modules, setModules] = useState<GroupedModules>({});
  
  async function getModuleList() {
    try {
      const response: ModuleListApiResponse =
        await methofGetWithoutParameter({
          url: "/api/modulelist",
        });

      if (response.success) {
        setModules(response.data);
      }
    } catch (error) {
      console.error("Error occurred", error);
    } 
  }

  useEffect(() => {
    getModuleList();
  }, []);

 

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(modules).map(([moduleType, moduleList]) => (
          <div
            key={moduleType}
            className="group rounded-2xl bg-white shadow-lg border border-gray-100
                       hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-br from-blue-400 to-navy-200 flex justify-center items-center py-4">
              <h1 className="font-semibold text-black text-[15px]">
                {moduleType.replace(/_/g, " ")}
              </h1>
            </div>

            {/* BODY */}
            <div className="p-4 max-h-64 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moduleList.map((item) => (
                  <div
                    key={item.module_id}
                    className="p-2 rounded-xl flex items-center gap-3 bg-gray-50 border border-gray-200
                               hover:bg-white hover:shadow-md transition cursor-pointer"
                  >
                    <span className="text-black text-[13px] font-semibold leading-tight hover:text-[#0075E1]">
                      {item.module_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
