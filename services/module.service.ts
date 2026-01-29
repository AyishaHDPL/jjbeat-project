import { db } from "@/lib/db";

export async function moduleListService() {
  const [rows]: any = await db.execute(
    `SELECT quality_module_id AS module_id,
       quality_name       AS module_name,
       'QUALITY'           AS module_type
FROM quality_module

UNION ALL

SELECT iedepartment_module_id,
       iedepartment_name,
       'IE_DEPARTMENT'
FROM iedepartment_module

UNION ALL

SELECT cutting_module_id,
       cutting_module_name,
       'CUTTING'
FROM cutting_module`,
  );
  return rows;
}
