import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request) {
  const currentUser = await getCurrentUser(request);

  if(!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    category,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        imageSrc,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id
      }
    })

    return NextResponse.json(listing)
}