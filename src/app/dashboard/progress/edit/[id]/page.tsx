export const runtime = 'edge';

export default function Edit({ params }: { params: { id: string } }) {
  return <div>ID Edit: {params.id}</div>;
}
