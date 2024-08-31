import { auth } from "@/auth"
import { writeFile } from "fs/promises"
import path from "path"

export const POST = async (request: Request) => {
  const session = await auth()
  const user = session?.user

  if (!user) return Response.json({ message: "Not logged in" }, { status: 400 })

  const formData = await request.formData()
  const file = formData.get("image")

  if (!(file instanceof File)) {
    return Response.json({ message: "No file uploaded" }, { status: 400 });
  }
  
  const buffer = Buffer.from(await file.arrayBuffer())
  const uuid = crypto.randomUUID()
  
  try {
    await writeFile(
      path.join(process.cwd(), "uploads/" + uuid + path.extname(file.name)),
      buffer
    )
    return Response.json({ message: "Success", url: "/uploads/" + uuid + path.extname(file.name) }, { status: 201 });
  } catch (error) {
    console.error(error)
    return Response.json({ message: "Failed to upload" }, { status: 500 })
  }
}