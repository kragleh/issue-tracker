import { auth } from "@/auth"
import { writeFile } from "fs/promises"
import path from "path"

export const POST = async (request: Request) => {
  const session = await auth()
  const user = session?.user

  if (!user) return Response.json({ error: "Not logged in" }, { status: 400 })

  const formData = await request.formData()
  const file = formData.get("image")

  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }
  
  const buffer = Buffer.from(await file.arrayBuffer())
  
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + crypto.randomUUID() + path.extname(file.name)),
      buffer
    )
    return Response.json({ message: "Success", url: "/uploads/" + crypto.randomUUID() + path.extname(file.name) }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to upload" }, { status: 500 })
  }
}