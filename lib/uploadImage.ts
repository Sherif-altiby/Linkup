import cloudinary from './cloudinary'

export async function uploadImage(file: string, folder: string = 'general') {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: 'auto',
  })

  return result.secure_url
}