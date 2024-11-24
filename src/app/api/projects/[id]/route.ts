/*
    Tudo que precisa de ID
    GET - Find /api/projects/{id}
    PATCH - Alterar /api/projects/{id}
    DELETE - Deleter
*/
import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    // Caso eu queria query params (?id=1)
    // const searchParams = request.nextUrl.searchParams; //Puxar todos os atributos
    // const id = searchParams.get('id'); // Eu escolho o que eu quero.

    // URL Params
    const id = (await params).id;
    try {
        // Estamos deixando pois o TS exige que confirmamos que o valor não é nulo.
        if (!id) {
            // Isso aqui vai virar o error.message do catch.
            throw new Error('ID Inválido!');
        }

        // HOFs find -> A mesma coisa
        // undefined/null caso não encontre
        // O valor caso encontre
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        // Os tipos pseudo falsos
        // 0, null, undefined --> Falsy
        if (!project) {
            //caso o projeto não exista.
            return NextResponse.json({ message: 'Projeto não encontrado!', status: 404 });
        } else {
            // Extra: O conceito de early return, seria uma melhoria aqui.
            return NextResponse.json(project); //Por padrão é status 200.
        }
    } catch (error) {
        // Error.message <-- ID Inválido.
        console.error(error); // Vai pro banco, ou pra um log.
        //Deu merda do nosso lado
        return NextResponse.json({ message: 'Ops.' }, { status: 500 });
    }
}