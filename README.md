```
export function hasWebChat(pathname: string, pathWhiteList: string[] = []) {
    const pathnameWithoutQuery = pathname.split('?')[0];
    const pathSections = pathWhiteList
        .map((path) => path.split('/'))
        .map((path) => path.filter((v, i) => i !== 0 && v !== ''));
    const pathnameSections =
        pathnameWithoutQuery.split('?')[0].lastIndexOf('/') !== -1
            ? pathnameWithoutQuery.split('/').filter((v, i) => i !== 0 && v !== '')
            : [];

    return pathSections
        .map((path) => {
            const isMatch = path
                .map((section, index) => {
                    const pathNameSection = pathnameSections[index];
                    if (section === pathNameSection) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .reduce((accumulator, currentValue) => {
                    return accumulator === true && currentValue === true;
                }, true);
            return isMatch;
        })
        .reduce((accumulator, currentValue) => {
            return accumulator === true || currentValue === true;
        }, false);
}


whitelist: [
 					'/register',
 					'/sign-in',
 					'/services/book/',
 					'/join-now/',
 				]


import { hasWebChat } from './yourModule'; // Adjust the import as necessary

describe('hasWebChat', () => {
    test('returns true when pathname matches an entry in pathWhiteList', () => {
        expect(hasWebChat('/home/chat', ['/home/chat'])).toBe(true);
    });

    test('returns false when pathname does not match any entry in pathWhiteList', () => {
        expect(hasWebChat('/home/about', ['/home/chat'])).toBe(false);
    });

    test('returns true when pathname matches a nested path in pathWhiteList', () => {
        expect(hasWebChat('/home/chat/support', ['/home/chat/support'])).toBe(true);
    });

    test('returns false when pathname has extra segments not in pathWhiteList', () => {
        expect(hasWebChat('/home/chat/support/extra', ['/home/chat/support'])).toBe(false);
    });

    test('returns true when pathname matches without query parameters', () => {
        expect(hasWebChat('/home/chat?user=123', ['/home/chat'])).toBe(true);
    });

    test('returns false for an empty whitelist', () => {
        expect(hasWebChat('/home/chat', [])).toBe(false);
    });

    test('returns false when pathname is root but whitelist contains subpaths', () => {
        expect(hasWebChat('/', ['/home/chat'])).toBe(false);
    });

    test('returns true when multiple paths exist and one matches', () => {
        expect(hasWebChat('/home/chat', ['/home/about', '/home/chat'])).toBe(true);
    });
});
