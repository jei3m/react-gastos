import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';
import crypto from 'crypto'
import { db } from '@/utils/db';
import {
    returnResponse,
    createTest,
    getTests
} from '@/sql/test/test.sql';
import { success, fail } from '@/utils/helpers';

interface TestResponseRow extends RowDataPacket {
  response: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();

    await db.query(
      createTest(), 
      { 
        actionType: 'create',
        name,
        description 
      }
    );

    const [rows] = await db.query<TestResponseRow[]>(returnResponse()),
        result = JSON.parse(rows[0].response);

    return success({ 
      response: result
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Failed to Create Tests');
  }
};

export async function GET() {
  try {
    const [rows] = await db.query(
      getTests()
    );

    return success({ data: rows });
  } catch (err) {
    return fail(err instanceof Error ? err.message : 'Failed to get tests');
  }
}