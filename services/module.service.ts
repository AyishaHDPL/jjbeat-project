// import { db } from "@/lib/db";

import { moduleData } from "@/app/component/dummydata";

// export async function moduleListService() {
//   const [rows]: any = await db.execute(
//     `SELECT quality_module_id AS module_id,
//        quality_name       AS module_name,
//        'QUALITY'           AS module_type
// FROM quality_module

// UNION ALL

// SELECT iedepartment_module_id,
//        iedepartment_name,
//        'IE_DEPARTMENT'
// FROM iedepartment_module

// UNION ALL

// SELECT cutting_module_id,
//        cutting_module_name,
//        'CUTTING'
// FROM cutting_module`,
//   );
//   return rows;
// }



export async function moduleListService() {
  // Flatten all module types into a single array like your DB query
  const { QUALITY, IE_DEPARTMENT, CUTTING } = moduleData.data;

  const allModules = [
    ...QUALITY.map((m) => ({ ...m, module_type: "QUALITY" })),
    ...IE_DEPARTMENT.map((m) => ({ ...m, module_type: "IE_DEPARTMENT" })),
    ...CUTTING.map((m) => ({ ...m, module_type: "CUTTING" })),
  ];

  // simulate async DB call
  return new Promise((resolve) => {
    setTimeout(() => resolve(allModules), 100); // optional small delay
  });
}

