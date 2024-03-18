

export function gridColumnsSizeForDesktop(isNavbarOpen: boolean, isTaskSettingsOpen: boolean): string {
    if (isNavbarOpen && isTaskSettingsOpen) {
        return '250px 1fr 350px';
    }

    if (isNavbarOpen && !isTaskSettingsOpen) {
        return '250px 1fr 0';
    }

    if (!isNavbarOpen && isTaskSettingsOpen) {
        return '0 1fr 350px';
    }

    if (!isNavbarOpen && !isTaskSettingsOpen) {
        return '0 1fr 0';
    }

    return '250px 1fr 0';
}

export function gridColumnsSizeForTablet(isTaskSettingsOpen: boolean): string {
    if (isTaskSettingsOpen) {
        return '0 1fr 350px';
    } else {
        return '0 1fr 0';
    }
}

