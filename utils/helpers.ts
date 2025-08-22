import { NextResponse } from 'next/server';

export function success(
    data: Record<string, any>, 
    status = 200
) {
    return NextResponse.json({
        success: true,
        ...data
    },{
        status
    })
};

export function fail(
    message: string,
    status = 500
) {
    return NextResponse.json({
        success: false,
        message
    },{
        status
    })
};