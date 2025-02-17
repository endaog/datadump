```
export const getUserRef = () => {
	return getItem(AccessTokenKeys.ref);
};

export function getItem(key: string, storage: Storage = localStorage): string | null {
	if (isStorageAvailable(storage)) {
		return storage.getItem(key);
	}
	return null;
}
