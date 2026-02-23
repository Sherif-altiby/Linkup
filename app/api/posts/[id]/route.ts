import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  
) {
  try {
    const { id } = await params  

    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    await prisma.post.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}


// EDIT post
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { content, image } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { 
        content, 
        image: image ?? post.image  
      }
    })

    return NextResponse.json(updatedPost, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}