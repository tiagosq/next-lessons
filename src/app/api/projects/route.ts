// Ele foi gerado no momento em que executamos a migration.
import { PrismaClient } from '@prisma/client'

// O Tiago esqueceu antes, mas precisamos estabelecer uma conexão antes.
const prisma = new PrismaClient();
/*
   GET - Lista de tudo /api/projects/ (Query/Params)
   PUT - Criação de um projeto /api/projects/
*/

// Independente do Prisma, qualquer API do Next precisa disso.
import {NextRequest, NextResponse} from "next/server";

// Só pode ter um método por endpoint
export async function GET() {
    try {
        const projectsResponse = await prisma.project.findMany();
        // const projects = JSON.stringify(projectsResponse);
        return NextResponse.json(projectsResponse, { status: 200 });
    } catch(error) {
        console.error(error);
        // Que isso aqui pro usuário é um erro 500.
        return NextResponse.json({ error: 'Ops. Ocorreu um erro durante a requisição.' }, { status: 500 });
    }
}

// No teu formulário
// Depois de preencher os campos e enviar
// Eu vou chegar nesta requisição (criando)

// Request não é de requisitar
// é de o resultado ação
export async function PUT(request: NextRequest) {
    // O back-end está ouvindo a requisição
    const content = await request.json(); // Pega os dados da requisição
    const { title, description } = content; // Desestrutura o que eu preciso

    // A model mesmo sendo capitalizada vai ser minúscula aqui no prisma-client
    const sqlResponse = await prisma.project.create({
        data: { // Tiago esqueceu, mas precisou da chave data.
            title,
            description,
        },
    });

    return NextResponse.json(sqlResponse, { status: 201 });
}