import { theoryBlocks } from '@/consts/theoryContent';
import { Route } from '@/routes/_auth/theory/block.$id';

const renderContent = (content: string) => {
  return content.split('\n').map((paragraph, idx) => {
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      const text = paragraph.slice(2, -2);
      return (
        <h3 key={idx} className="mt-4 mb-2 font-semibold text-gray-800">
          {text}
        </h3>
      );
    }
    if (paragraph.startsWith('• ')) {
      return (
        <li key={idx} className="ml-4 mb-1 text-gray-700">
          {paragraph.slice(2)}
        </li>
      );
    }
    if (paragraph.trim() === '') {
      return null;
    }
    return (
      <p key={idx} className="mb-5 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    );
  });
};

export const TheoryBlock = () => {
  const params = Route.useParams();
  const block = theoryBlocks.find((b) => b.id === params.id);

  return block ? (
    <article key={block.id} className="p-5 bg-white rounded-xl text-pretty">
      <h2 className="text-lg font-medium text-gray-900 mb-5 text-balance">
        {block.title}
      </h2>
      {renderContent(block.content)}
    </article>
  ) : (
    <div className="py-12 text-center">
      <p className="text-gray-500">Bloque no encontrado.</p>
    </div>
  );
};
