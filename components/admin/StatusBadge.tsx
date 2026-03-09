export default function StatusBadge({ draft }: { draft: boolean }) {
  return (
    <span
      className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
        draft
          ? "bg-mc-lime/30 text-mc-dark/70"
          : "bg-mc-mint/20 text-mc-dark/70"
      }`}
    >
      {draft ? "Draft" : "Published"}
    </span>
  );
}
