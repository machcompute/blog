"use client";

export default function SaveBar({
  dirty,
  saving,
  onSave,
  onDiscard,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  if (!dirty && !saving) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-mc-gray/15 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm text-mc-gray">
          {saving ? "Saving..." : "Unsaved changes"}
        </span>
        <div className="flex gap-3">
          <button
            onClick={onDiscard}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-sm font-medium text-mc-gray hover:text-mc-dark transition-colors disabled:opacity-50"
          >
            Discard
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-mc-mint text-mc-dark text-sm font-medium hover:bg-mc-mint/80 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
