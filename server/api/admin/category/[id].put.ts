
//import prisma  from '../../../utils/prisma'

import prisma from '~/server/utils/prisma' 

import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })

  try {
    
  
    const body = await readBody(event)
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
      },
    })
    return updatedCategory
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update category',
    })
  }
})