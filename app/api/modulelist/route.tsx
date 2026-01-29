import { moduleListController } from "@/controller/modulelist.controller";

export async function GET() {
  return moduleListController();
}
