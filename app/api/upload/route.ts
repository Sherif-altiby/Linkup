import { uploadImage } from '@/lib/uploadImage'

export async function POST(req: Request) {
  const { image } = await req.json() // base64 or url

  const url = await uploadImage(image, 'avatars')

  return Response.json({ url })
}