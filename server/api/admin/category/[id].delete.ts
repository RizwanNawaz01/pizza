
//import prisma  from '../../../utils/prisma'

import prisma from '~/server/utils/prisma' 


export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid category ID' })

  try {
  
    await prisma.category.delete({
      where: { id },
    })
    return { message: 'Category deleted successfully' }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete category',
    })
  }
})
