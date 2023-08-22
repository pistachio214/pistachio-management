interface TokenState {
    colorPrimary: string;
    colorLink: string;
    colorLinkActive: string;
    colorLinkHover: string;
}

interface ThemeState {
    config: {
        token: TokenState;
    };
    deepcolor?: string;
}

export type {
    TokenState,
    ThemeState
}