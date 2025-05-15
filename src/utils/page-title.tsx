export function generatePageMetadata(title: string, description?: string) {
  return {
    title,
    description: description || `${title} page`,
  };
}
