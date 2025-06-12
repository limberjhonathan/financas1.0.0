export default function formatCode(input: string): string {
    const rawValue = input.replace(/\D/g, "").slice(0, 6);
    return rawValue.replace(/(\d{3})(\d{1,3})?/, (_, g1, g2) =>
        g2 ? `${g1}-${g2}` : g1
    );
}