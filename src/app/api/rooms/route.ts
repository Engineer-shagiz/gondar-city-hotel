import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// 1. GET: ሁሉንም ክፍሎች ያለ ምንም ይዘት ቅነሳ ከ Supabase ማምጣት
export async function GET() {
  try {
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // ከዳታቤዝ የመጣውን የባህሪያት ፅሁፍ ወደ አሬይ (Array) መቀየር
    const formattedRooms = rooms.map((room) => ({
      ...room,
      features: room.features 
        ? (typeof room.features === 'string' ? room.features.split(',').map((f: string) => f.trim()) : room.features)
        : [],
    }));

    return NextResponse.json(formattedRooms, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// 2. POST: በአድሚን የሚጨመሩትን ሁሉንም ይዘቶች ሳይቀንሱ በሙሉ ማስቀመጥ
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      price, 
      size, 
      guests, 
      features, 
      image_url, 
      video_url, 
      bank_details, 
      telebirr_details,
      is_event,
      description 
    } = body;

    const featuresString = Array.isArray(features) ? features.join(', ') : features;

    const { data, error } = await supabase
      .from('rooms')
      .insert([
        {
          name,
          price,
          size,
          guests,
          features: featuresString,
          image_url,
          video_url, 
          status: 'available',
          bank_details,
          telebirr_details,
          is_event: is_event || false,
          description: description || ''
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. PATCH: የክፍሉን ሁኔታ ማደስ
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('rooms')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}