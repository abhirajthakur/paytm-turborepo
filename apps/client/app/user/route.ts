import prisma from "@repo/database";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return Response.json(users);
  } catch (e) {
    return Response.json({ error: "Users not found" });
  }
}

export async function POST(request: Response) {
  try {
    const { email, name } = await request.json();
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });

    console.log(user);
    return Response.json({ message: "User created successfully" });
  } catch (e) {
    return Response.json({ error: "User already exists" });
  }
}
