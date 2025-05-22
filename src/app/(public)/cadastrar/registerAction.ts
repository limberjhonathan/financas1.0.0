'use server'
export default async function registerAction(formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries);

    console.log(data);
    // Aqui você pode adicionar a lógica para processar os dados do formulário, como enviar para uma API ou armazenar em um banco de dados.
}