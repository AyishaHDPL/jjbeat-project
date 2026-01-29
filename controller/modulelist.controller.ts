import { moduleListService } from "@/services/module.service";
import { NextResponse } from "next/server";

export async function moduleListController() {
  try {
    const result = await moduleListService();

    const groupData = result.reduce((acc: any, item: any) => {
      if (!acc[item.module_type]) {
        acc[item.module_type] = [];
      }
      acc[item.module_type].push({
        module_id: item.module_id,
        module_name: item.module_name,
      });
      return acc;
    }, {});

    return NextResponse.json({
      message: "got response",
      success: true,
      data: groupData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured", success: false },
      { status: 500 },
    );
  }
}
