import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth/currentUser'
import { uploadImage } from '@/lib/uploadImage'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, image } = await req.json()

    if (!content) {
      return Response.json({ error: 'Content is required' }, { status: 400 })
    }

    // upload image to cloudinary if exists
    let imageUrl = null
    if (image) {
      imageUrl = await uploadImage(image, 'posts')
    }

    const post = await prisma.post.create({
      data: {
        content,
        image: imageUrl,
        authorId: user.id,
      },
    })

    return Response.json(post, { status: 201 })

  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}