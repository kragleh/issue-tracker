import { existsSync, readFileSync } from "fs"
import path from "path"

export const GET = (req: Request, { params }: { params: { filename: string } }) => {
  const { filename } = params
  const filePath = path.join(process.cwd(), 'uploads', filename)

  try {
    if (existsSync(filePath)) {
      const fileBuffer = readFileSync(filePath)
      const fileExtension = path.extname(filename).slice(1)
      
      const contentType = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
      }[fileExtension] || 'application/octet-stream'

      return new Response(fileBuffer, {
        headers: {
          'Content-Type': contentType,
        },
      })
    } else {
      return Response.json({ message: 'File not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return Response.json({ message: 'Server error' }, { status: 500 })
  }
}