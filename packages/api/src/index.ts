import { Hono } from "hono";
import { Env } from "./types";

const app = new Hono<Env>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
