interface User {
  id: number;
  name: string;
  email: string;
}

interface UserSelectorProps {
  users: User[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  loading: boolean;
}

export default function UserSelector({
  users,
  selectedId,
  onSelect,
  loading,
}: UserSelectorProps) {
  return (
    <div className="w-full max-w-sm">
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select a user
      </label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={loading}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
      >
        <option value="" disabled>
          {loading ? "Loading users..." : "Choose a user"}
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
}
