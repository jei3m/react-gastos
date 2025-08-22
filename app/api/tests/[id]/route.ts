import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';
import { db } from '@/utils/db';
import {
    returnResponse,
    updateTest,
    deleteTest
} from '@/sql/test/test.sql';
import { success, fail } from '@/utils/helpers';

interface responseRow extends RowDataPacket {
  response: string;
}

export async function PUT(
    req: NextRequest,
    { params }: {params: { id: string } }
) {
    try {
        const {
            name, 
            description
        } = (await req.json()).payload,
            id = params.id;
        
        await db.query(updateTest(), {
            actionType: 'update',
            id,
            name,
            description
        });

        const [rows] = await db.query<responseRow[]>(returnResponse()),
            result = JSON.parse(rows[0].response);
        
        return success({ 
            response: JSON.parse(
                result[0].response
            ) 
        });
    } catch (error) {
        return fail(error instanceof Error ? error.message : 'Failed to Update Test');
    }
};

export async function DELETE(
    _req: NextRequest,
    { params }: {params: { id: string } }
) {
    try {
        const id = params.id;
        
        await db.query(deleteTest(), {
            actionType: 'delete',
            id
        });

        const [rows] = await db.query<responseRow[]>(returnResponse()),
            result = JSON.parse(rows[0].response);
        
        return success({ 
            response: JSON.parse(
                result[0].response
            ) 
        });
    } catch (error) {
        return fail(error instanceof Error ? error.message : 'Failed to Update Test');
    }
};