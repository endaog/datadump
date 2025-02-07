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
