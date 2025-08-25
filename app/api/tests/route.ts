import { NextRequest } from 'next/server';
// import crypto from 'crypto'
import { db } from '@/utils/db';
import {
    createTest,
    getTests
} from '@/sql/test/test.sql';
import { success, fail } from '@/utils/helpers';
import { responseRow } from '@/types/response.types';

export async function POST(req: NextRequest) {
  try {
    const {name, description} = await req.json();

    const [resultCreate] = await db.query<responseRow[]>(
      createTest(), 
      { 
        actionType: 'create',
        name,
        description 
      }
    );

    return success({ 
      response: JSON.parse(resultCreate[1][0].response)
    });
  } catch (error) {
    return fail(
      error instanceof Error ? error.message : 'Failed to Create Tests'
    );
  }
};

export async function GET() {
  try {
    const [rows] = await db.query(
      getTests()
    );

    return success({ data: rows });
  } catch (err) {
    return fail(
      err instanceof Error ? err.message : 'Failed to get tests'
    );
  }
};