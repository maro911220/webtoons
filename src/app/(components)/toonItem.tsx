/* eslint-disable @next/next/no-img-element */
interface toon {
  url: string;
  title: string;
  authors: string[];
  thumbnail: string[];
}

export default function ToonItem({ toon }: { toon: toon }) {
  return (
    <a
      href={toon.url}
      target="_blank"
      rel="noopener noreferrer"
      className="toon-list-item"
    >
      <img src={toon.thumbnail[0]} alt={toon.title} />
      <div className="toon-list-item__box">
        <p>{toon.title}</p>
        <div>
          {toon.authors.slice(0, 3).map((name: string, index: number) => (
            <span key={index}>{name}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
