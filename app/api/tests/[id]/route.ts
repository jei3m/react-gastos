import { NextRequest } from 'next/server';
import { db } from '@/utils/db';
import {
    updateTest,
    deleteTest
} from '@/sql/test/test.sql';
import { success, fail } from '@/utils/helpers';
import { responseRow } from '@/types/response.types';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { name, description } = await req.json();
    const { id } = await params; 

    const [resultUpdate] = await db.query<responseRow[]>(
      updateTest(),
      { actionType: 'update', id, name, description }
    );

    return success({
      response: JSON.parse(resultUpdate[1][0].response)
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to Update Test');
  }
}

export async function DELETE(
    _req: NextRequest,
    { params }: {params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; 
        
        const [resultDelete] = await db.query<responseRow[]>(
            deleteTest(), 
            {
                actionType: 'delete',
                id
            }
        );
        
        return success({ 
            response: JSON.parse(resultDelete[1][0].response)
        });
    } catch (error) {
        return fail(error instanceof Error ? error.message : 'Failed to Update Test');
    }
};