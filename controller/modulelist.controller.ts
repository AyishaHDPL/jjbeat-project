import { moduleListService, Module } from "@/services/module.service";
import { NextResponse } from "next/server";

// Controller — formats data
export async function moduleListController() {
  try {
    const result: Module[] = await moduleListService();

    // Group by module_type
    const groupData = result.reduce((acc: Record<string, any[]>, item: Module) => {
      if (!acc[item.module_type]) acc[item.module_type] = [];
      acc[item.module_type].push({
        module_id: item.module_id,
        module_name: item.module_name,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      message: "got response",
      success: true,
      data: groupData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occurred", success: false },
      { status: 500 }
    );
  }
}
