import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin/edit/:id", "routes/admin.edit.$id.tsx"),
] satisfies RouteConfig;
