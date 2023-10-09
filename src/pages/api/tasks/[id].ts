import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const tasksRef = db.collection("tasks");

export const post: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const pubDate = formData.get("pubDate")?.toString();
  const description = formData.get("description")?.toString();
  const heroImage = formData.get("heroImage")?.toString();
  const content = formData.get("content") === "on";

  if (!title || !pubDate) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find task", {
      status: 404,
    });
  }

  try {
    await tasksRef.doc(params.id).update({
      title,
      pubDate,
      content,
      description,
      heroImage
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};

export const del: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find task", {
      status: 404,
    });
  }

  try {
    await tasksRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};